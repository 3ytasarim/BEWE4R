import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(png|jpeg|jpg|gif|webp|svg\+xml)$/.test(file.mimetype);
    cb(null, ok);
  },
});

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const b64 = req.file.buffer.toString("base64");
  const mime = req.file.mimetype;
  const url = `data:${mime};base64,${b64}`;
  return res.json({ url });
});

export default router;
