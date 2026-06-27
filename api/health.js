export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    service: "ai-os-ide",
    realtime: "notified",
    time: Date.now()
  });
}
