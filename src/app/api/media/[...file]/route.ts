import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UPLOADS_DIR } from "@/lib/db";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ file: string[] }> }
) {
  const { file } = await ctx.params;
  const name = path.basename(file.join("/")); // flat storage, no traversal
  const fullPath = path.join(UPLOADS_DIR, name);
  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ext = path.extname(name).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  const stat = fs.statSync(fullPath);
  const range = req.headers.get("range");

  // Range support so <video> can seek
  if (range && type.startsWith("video/")) {
    const m = range.match(/bytes=(\d*)-(\d*)/);
    const start = m?.[1] ? parseInt(m[1], 10) : 0;
    const end = m?.[2] ? parseInt(m[2], 10) : stat.size - 1;
    const chunk = fs.createReadStream(fullPath, { start, end });
    return new NextResponse(chunk as unknown as ReadableStream, {
      status: 206,
      headers: {
        "Content-Type": type,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(end - start + 1),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const stream = fs.createReadStream(fullPath);
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": type,
      "Content-Length": String(stat.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
