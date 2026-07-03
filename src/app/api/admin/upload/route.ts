import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { isAdmin } from "@/lib/adminAuth";
import { UPLOADS_DIR } from "@/lib/db";

const MAX_BYTES = 60 * 1024 * 1024; // 60MB — enough for short product videos
const ALLOWED = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif",
  ".mp4", ".mov", ".webm",
]);

export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 60MB)" }, { status: 413 });
  }
  const ext = path.extname(file.name || "").toLowerCase();
  if (!ALLOWED.has(ext)) {
    return NextResponse.json(
      { error: `Unsupported file type ${ext || "(none)"}` },
      { status: 415 }
    );
  }

  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOADS_DIR, name), buffer);

  return NextResponse.json({ url: `/api/media/${name}` }, { status: 201 });
}
