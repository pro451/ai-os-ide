import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setOutput(data.output);
    } catch (e) {
      setOutput('Error connecting to AI backend');
    }

    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: 260, background: '#111', color: '#fff', padding: 12 }}>
        <h3>AI OS IDE</h3>
        <p>Cursor-style workspace</p>
      </aside>

      <main style={{ flex: 1, background: '#0b0b0b', color: '#fff', padding: 16 }}>
        <h2>AI Chat Panel</h2>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI..."
          style={{ width: '100%', height: 120 }}
        />

        <button onClick={send} disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>

        <div style={{ marginTop: 20 }}>
          <h3>Response</h3>
          <pre>{output}</pre>
        </div>
      </main>
    </div>
  );
}