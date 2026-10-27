"use client";

import React, { useState, useEffect } from "react";
import {
  IntelligenceSignal,
  Opportunity,
  UserProfile,
  UserOpportunityRecord,
  OpportunityStatus,
} from "@/types";
import {
  RAW_SIGNALS,
  SEED_OPPORTUNITIES,
  RAW_INTERSECTIONS,
  RAW_HISTORICAL_EVENTS,
  RAW_FUTURE_SCENARIOS,
} from "@/lib/data/seed";
import { DEFAULT_USER_PROFILE } from "@/lib/data/profile";
import { calculatePersonalFit } from "@/lib/scoring";
import { AppShell, NavTab } from "@/components/shared/AppShell";
import { OverviewView } from "@/components/dashboard/OverviewView";
import { IntelligenceFeedView } from "@/components/intelligence/IntelligenceFeedView";
import { HistoricalView } from "@/components/intelligence/HistoricalView";
import { IntersectionLabView } from "@/components/intersections/IntersectionLabView";
import { DiscoverOpportunitiesView } from "@/components/opportunities/DiscoverOpportunitiesView";
import { FutureScenariosView } from "@/components/scenarios/FutureScenariosView";
import { ActionTrackerView } from "@/components/tracker/ActionTrackerView";
import { ProfileSettingsView } from "@/components/profile/ProfileSettingsView";
import { OpportunityDetailModal } from "@/components/opportunities/OpportunityDetailModal";
import { ResearchModal } from "@/components/research/ResearchModal";

const STORAGE_KEY_PROFILE = "vantage_user_profile_v1";
const STORAGE_KEY_SAVED = "vantage_saved_records_v1";

export default function VantageApp() {
  const [currentTab, setCurrentTab] = useState<NavTab>("overview");
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(SEED_OPPORTUNITIES);
  const [savedRecords, setSavedRecords] = useState<UserOpportunityRecord[]>([
    {
      id: "user-opp-1",
      opportunityId: "opp-001",
      status: "validating",
      notes: "Completed initial mapping of EU AI Act Article 53 requirements. Spoke with 2 enterprise CTOs in Berlin who confirmed high willingness to pay for programmatic audits.",
      nextAction: "Build the CLI scanner prototype and test against 3 open model repos.",
      targetDate: "2026-04-15",
      progress: 45,
      experiments: [
        {
          id: "exp-1",
          date: "2026-03-20",
          hypothesis: "Founders are unaware of systemic risk reporting requirements.",
          result: "Confirmed: 4 out of 5 founders surveyed had not read Article 53.",
          learning: "Position the initial hook as a free 'Liability Risk Check' rather than just a compliance tool.",
        },
      ],
      createdAt: "2026-03-15T10:00:00Z",
      updatedAt: "2026-03-22T14:30:00Z",
    },
    {
      id: "user-opp-2",
      opportunityId: "opp-002",
      status: "investigating",
      notes: "Reviewing CAISO API documentation for negative wholesale spot electricity intervals.",
      nextAction: "Calculate net cloud egress fees vs local compute electricity savings.",
      targetDate: "2026-04-30",
      progress: 20,
      experiments: [],
      createdAt: "2026-03-18T12:00:00Z",
      updatedAt: "2026-03-18T12:00:00Z",
    },
  ]);

  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProf = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProf) {
        const parsed = JSON.parse(savedProf);
        setUserProfile(parsed);
      }

      const savedRecs = localStorage.getItem(STORAGE_KEY_SAVED);
      if (savedRecs) {
        const parsed = JSON.parse(savedRecs);
        setSavedRecords(parsed);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
  }, []);

  // Recalculate personal fit across all opportunities whenever profile updates
  useEffect(() => {
    setOpportunities((prev) =>
      prev.map((opp) => ({
        ...opp,
        personalFit: calculatePersonalFit(opp, userProfile),
      }))
    );
  }, [userProfile]);

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update profile handler
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  // Save opportunity to tracker
  const handleSaveOpportunity = (
    oppId: string,
    status: OpportunityStatus = "discovered",
    notes: string = ""
  ) => {
    const existingIndex = savedRecords.findIndex((r) => r.opportunityId === oppId);
    const now = new Date().toISOString();

    let updatedRecords = [...savedRecords];
    if (existingIndex >= 0) {
      updatedRecords[existingIndex] = {
        ...updatedRecords[existingIndex],
        status,
        notes: notes || updatedRecords[existingIndex].notes,
        updatedAt: now,
      };
    } else {
      const newRecord: UserOpportunityRecord = {
        id: `user-opp-${Date.now()}`,
        opportunityId: oppId,
        status,
        notes: notes || "Discovered via VANTAGE Intelligence platform.",
        nextAction: "Execute 7-day validation check.",
        targetDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        progress: 10,
        experiments: [],
        createdAt: now,
        updatedAt: now,
      };
      updatedRecords.unshift(newRecord);
    }

    setSavedRecords(updatedRecords);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updatedRecords));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    // Also notify backend API (non-blocking)
    fetch("/api/my-opportunities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: oppId, status, notes }),
    }).catch(() => {});
  };

  // Update existing tracked record
  const handleUpdateRecord = (
    recordId: string,
    updates: Partial<UserOpportunityRecord> & { newExperiment?: any }
  ) => {
    const updated = savedRecords.map((r) => {
      if (r.id === recordId) {
        return {
          ...r,
          ...updates,
          experiments: updates.newExperiment
            ? [...r.experiments, { ...updates.newExperiment, id: `exp-${Date.now()}` }]
            : r.experiments,
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });

    setSavedRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    // Call backend PATCH
    fetch(`/api/my-opportunities/${recordId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch(() => {});
  };

  const savedOpportunityIds = savedRecords.map((r) => r.opportunityId);
  const savedOpportunities = opportunities.filter((o) =>
    savedOpportunityIds.includes(o.id)
  );

  return (
    <AppShell
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      profile={userProfile}
      savedCount={savedRecords.length}
      onOpenSearch={() => setIsSearchOpen(true)}
    >
      {/* View Switcher */}
      {currentTab === "overview" && (
        <OverviewView
          signals={RAW_SIGNALS}
          opportunities={opportunities}
          intersections={RAW_INTERSECTIONS}
          profile={userProfile}
          onSelectOpportunity={setSelectedOpportunity}
          onNavigateTab={(tab) => setCurrentTab(tab as NavTab)}
          onSaveOpportunity={(id) => handleSaveOpportunity(id)}
          savedOpportunityIds={savedOpportunityIds}
        />
      )}

      {currentTab === "feed" && (
        <IntelligenceFeedView
          signals={RAW_SIGNALS}
          onOpenResearchModal={(q) => setIsSearchOpen(true)}
        />
      )}

      {currentTab === "historical" && (
        <HistoricalView events={RAW_HISTORICAL_EVENTS} />
      )}

      {currentTab === "intersections" && (
        <IntersectionLabView profile={userProfile} />
      )}

      {currentTab === "discover" && (
        <DiscoverOpportunitiesView
          opportunities={opportunities}
          profile={userProfile}
          onSelectOpportunity={setSelectedOpportunity}
          onSaveOpportunity={(id) => handleSaveOpportunity(id)}
          savedOpportunityIds={savedOpportunityIds}
        />
      )}

      {currentTab === "scenarios" && (
        <FutureScenariosView scenarios={RAW_FUTURE_SCENARIOS} />
      )}

      {currentTab === "saved" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                My Saved Opportunities ({savedOpportunities.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Bookmarked opportunities under active investigation or execution.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("tracker")}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition"
            >
              Open Action Tracker Kanban →
            </button>
          </div>

          <DiscoverOpportunitiesView
            opportunities={savedOpportunities}
            profile={userProfile}
            onSelectOpportunity={setSelectedOpportunity}
            onSaveOpportunity={(id) => handleSaveOpportunity(id)}
            savedOpportunityIds={savedOpportunityIds}
          />
        </div>
      )}

      {currentTab === "tracker" && (
        <ActionTrackerView
          records={savedRecords}
          allOpportunities={opportunities}
          onUpdateRecord={handleUpdateRecord}
          onSelectOpportunity={setSelectedOpportunity}
        />
      )}

      {currentTab === "profile" && (
        <ProfileSettingsView
          profile={userProfile}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* Opportunity Detail Dossier Modal */}
      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSaveToTracker={(id, status, notes) => handleSaveOpportunity(id, status, notes)}
          isSaved={savedOpportunityIds.includes(selectedOpportunity.id)}
        />
      )}

      {/* Global Strategic Research Modal (Ctrl+K) */}
      <ResearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </AppShell>
  );
}
