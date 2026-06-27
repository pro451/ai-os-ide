export default function handler(req, res) {
  try {
    const { prompt = "" } = req.body || {};

    // lightweight AI core simulation (will be replaced with real model later)
    const response = {
      id: Date.now(),
      input: prompt,
      output: `AI IDE response: ${prompt}`,
      mode: "dev",
      status: "success"
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: "AI handler failed",
      detail: String(err)
    });
  }
}
