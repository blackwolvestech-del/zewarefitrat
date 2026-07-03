import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Simple, dependency-free admin auth.
 * Set ADMIN_PASSWORD in the environment (Coolify → Environment Variables).
 * Falls back to a default for first-run local use — change it before launch.
 */
const PASSWORD = process.env.ADMIN_PASSWORD || "zewarefitrat123";
const SECRET =
  process.env.ADMIN_SECRET ||
  crypto.createHash("sha256").update(`zf-admin-secret::${PASSWORD}`).digest("hex");

export const ADMIN_COOKIE = "zf_admin";
export const usingDefaultPassword = !process.env.ADMIN_PASSWORD;

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function checkPassword(input: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function makeToken(days = 7): string {
  const exp = Date.now() + days * 24 * 60 * 60 * 1000;
  return `${exp}.${sign(String(exp))}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = sign(expStr);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
