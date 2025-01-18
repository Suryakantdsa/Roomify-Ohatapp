import express from "express";

const app = express();
const PORT = process.env.PORT || "8001";

app.get("/", (req, res) => {
  res.status(200).json({ message: "server working fine" });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
