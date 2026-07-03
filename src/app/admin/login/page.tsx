import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin, usingDefaultPassword } from "@/lib/adminAuth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <LoginForm showDefaultHint={usingDefaultPassword} />;
}
