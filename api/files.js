// 📁 Virtual File System (MVP Cursor-style)

const files = {
  "App.tsx": "console.log('Hello from IDE');",
  "api/ai.js": "export default function handler() {}",
  "memory.js": "// memory"
};

export default function handler(req, res) {
  const { action, file, content } = req.body || {};

  if (action === "list") {
    return res.json({ files: Object.keys(files) });
  }

  if (action === "read") {
    return res.json({ file, content: files[file] || "" });
  }

  if (action === "write") {
    files[file] = content;
    return res.json({ status: "updated", file });
  }

  return res.status(400).json({ error: "Invalid action" });
}