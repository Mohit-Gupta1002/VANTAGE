import assert from "node:assert";

async function verify() {
  console.log("=== VERIFYING VANTAGE LIVE HTTP ENDPOINTS (PORT 3001) ===");

  const endpoints = [
    { url: "http://localhost:3001/", name: "Root Dashboard HTML Page" },
    { url: "http://localhost:3001/api/dashboard", name: "GET /api/dashboard" },
    { url: "http://localhost:3001/api/signals", name: "GET /api/signals" },
    { url: "http://localhost:3001/api/my-opportunities", name: "GET /api/my-opportunities" },
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url);
      console.log(`✓ ${ep.name}: Status ${res.status} ${res.statusText}`);
      assert.strictEqual(res.status, 200, `${ep.name} should return 200`);
    } catch (err) {
      console.error(`✗ ${ep.name} failed:`, err.message);
      process.exit(1);
    }
  }

  // POST /api/opportunities/discover
  {
    const res = await fetch("http://localhost:3001/api/opportunities/discover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: "Startup & Business" }),
    });
    const data = await res.json();
    console.log(`✓ POST /api/opportunities/discover: Status ${res.status}, Returned ${data.total} opportunities`);
    assert.strictEqual(res.status, 200);
    assert.ok(data.opportunities.length > 0);
  }

  // POST /api/intersections
  {
    const res = await fetch("http://localhost:3001/api/intersections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domainA: "Artificial Intelligence",
        domainB: "Legaltech & Operations",
      }),
    });
    const data = await res.json();
    console.log(`✓ POST /api/intersections: Status ${res.status}, Hypothesis: ${data.hypothesis.emergingUnmetNeed.slice(0, 50)}...`);
    assert.strictEqual(res.status, 200);
    assert.ok(data.hypothesis);
  }

  // POST /api/research
  {
    const res = await fetch("http://localhost:3001/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "Behind-the-meter compute microgrids",
        domain: "Climate & Energy",
      }),
    });
    const data = await res.json();
    console.log(`✓ POST /api/research: Status ${res.status}, Title: ${data.report.title}`);
    assert.strictEqual(res.status, 200);
    assert.ok(data.report);
  }

  // POST /api/scenarios
  {
    const res = await fetch("http://localhost:3001/api/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeframe: "3 Years" }),
    });
    const data = await res.json();
    console.log(`✓ POST /api/scenarios: Status ${res.status}, Returned ${data.total} scenarios`);
    assert.strictEqual(res.status, 200);
    assert.ok(data.scenarios.length > 0);
  }

  // POST and PATCH /api/my-opportunities
  {
    const resSave = await fetch("http://localhost:3001/api/my-opportunities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opportunityId: "opp-003",
        status: "validating",
        notes: "Automated test save verification",
      }),
    });
    const dataSave = await resSave.json();
    console.log(`✓ POST /api/my-opportunities: Status ${resSave.status}, Record ID: ${dataSave.record.id}`);
    assert.ok(dataSave.record);

    const resPatch = await fetch(`http://localhost:3001/api/my-opportunities/${dataSave.record.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progress: 60,
        nextAction: "Execute 5 interviews with corporate GCs",
      }),
    });
    const dataPatch = await resPatch.json();
    console.log(`✓ PATCH /api/my-opportunities/[id]: Status ${resPatch.status}, Updated progress to ${dataPatch.record.progress}%`);
    assert.strictEqual(dataPatch.record.progress, 60);
  }

  console.log("\nALL 9 LIVE HTTP ENDPOINTS VERIFIED AND RESPONDING 200 OK! 🎯");
}

verify();
