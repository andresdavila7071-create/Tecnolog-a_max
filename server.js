export const schema =
  "CREATE TABLE IF NOT EXISTS visitor_feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, kind TEXT NOT NULL, aspect TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL); CREATE INDEX IF NOT EXISTS visitor_feedback_created ON visitor_feedback(created_at DESC);";

const json = (body, status = 200) => Response.json(body, { status });
const cleanText = (value, max) => typeof value === "string" && value.length <= max;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/feedback/owner" && request.method === "GET") {
      const userId = request.headers.get("x-websim-user-id");
      const ownerId = request.headers.get("x-websim-project-owner-id");
      if (!userId || userId !== ownerId) return json({ error: "Not found" }, 404);
      const { results } = await env.DB.prepare(
        "SELECT kind, aspect, payload, created_at FROM visitor_feedback ORDER BY id DESC LIMIT 50"
      ).all();
      return json({ entries: results.map((row) => ({ ...row, payload: JSON.parse(row.payload) })) });
    }

    if (url.pathname === "/api/feedback/survey" && request.method === "POST") {
      const userId = request.headers.get("x-websim-user-id");
      if (!userId) return json({ error: "Sign in to save shared feedback" }, 401);
      let body;
      try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      const allowed = ["design", "clarity", "favorite", "navigation", "visuals", "quiz", "recommend", "topic", "improve", "tools"];
      if (!body || typeof body !== "object" || Object.keys(body).some((key) => !allowed.includes(key) || !cleanText(body[key], ["topic", "improve", "tools"].includes(key) ? 1200 : 100))) {
        return json({ error: "Invalid survey response" }, 400);
      }
      if (!["design", "clarity", "favorite", "navigation", "recommend"].every((key) => body[key].trim())) {
        return json({ error: "Required survey answers are missing" }, 400);
      }
      const createdAt = new Date().toISOString();
      await env.DB.prepare(
        "INSERT INTO visitor_feedback (user_id, kind, aspect, payload, created_at) VALUES (?, ?, ?, ?, ?)"
      ).bind(userId, "survey", body.favorite, JSON.stringify(body), createdAt).run();
      return json({ ok: true, persisted: true }, 201);
    }

    if (url.pathname === "/api/feedback/comment" && request.method === "POST") {
      const userId = request.headers.get("x-websim-user-id");
      if (!userId) return json({ error: "Sign in to save shared feedback" }, 401);
      let body;
      try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      if (!body || !cleanText(body.aspect, 60) || !body.aspect.trim() || !cleanText(body.comment, 1200) || body.comment.trim().length < 8) {
        return json({ error: "Choose a topic and write at least 8 characters" }, 400);
      }
      const payload = { aspect: body.aspect.trim(), comment: body.comment.trim() };
      await env.DB.prepare(
        "INSERT INTO visitor_feedback (user_id, kind, aspect, payload, created_at) VALUES (?, ?, ?, ?, ?)"
      ).bind(userId, "comment", payload.aspect, JSON.stringify(payload), new Date().toISOString()).run();
      return json({ ok: true, persisted: true }, 201);
    }

    return new Response("Not found", { status: 404 });
  },
};
