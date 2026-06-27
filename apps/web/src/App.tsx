import React, { useEffect, useState } from "react";

export default function App() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState("App.tsx");
  const [code, setCode] = useState("");
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadFiles();
    loadFile("App.tsx");
  }, []);

  async function loadFiles() {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "list" })
    });
    const data = await res.json();
    setFiles(data.files);
  }

  async function loadFile(file) {
    setActiveFile(file);
    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "read", file })
    });
    const data = await res.json();
    setCode(data.content);
  }

  async function applyAI() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "edit " + code, sessionId: "cursor" })
    });

    const data = await res.json();

    if (data.mode === "cursor-edit") {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: activeFile, patches: data.patches })
      });

      loadFile(activeFile);
    }

    setChat((c) => [...c, { role: "ai", content: data.message || "done" }]);
  }

  async function sendChat() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input, sessionId: "cursor" })
    });

    const data = await res.json();

    setChat([...chat, { role: "user", content: input }, { role: "ai", content: data.message || data.output }]);
    setInput("");
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0b0f19", color: "white" }}>
      <div style={{ width: 220, background: "#111827", padding: 10 }}>
        <h3>Files</h3>
        {files.map((f) => (
          <div key={f} onClick={() => loadFile(f)} style={{ cursor: "pointer", padding: 4 }}>
            {f}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <textarea
          style={{ flex: 1, background: "#0f172a", color: "white", padding: 10 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div style={{ padding: 10 }}>
          <button onClick={applyAI}>Apply AI Edit</button>
        </div>
      </div>

      <div style={{ width: 320, background: "#0f172a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto", padding: 10 }}>
          {chat.map((c, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <b>{c.role}:</b> {c.content}
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1 }} />
          <button onClick={sendChat}>➤</button>
        </div>
      </div>
    </div>
  );
}
