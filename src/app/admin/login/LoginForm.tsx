"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ showDefaultHint }: { showDefaultHint: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password");
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-[80svh] items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <Image
            src="/brand/logo.png"
            alt="ZEWARE FITRAT"
            width={262}
            height={120}
            className="h-12 w-auto"
          />
          <h1 className="mt-6 font-serif text-3xl font-light">Atelier Admin</h1>
          <p className="mt-2 text-[12px] uppercase tracking-wide2 text-stone">
            Manage products &amp; orders
          </p>
        </div>

        <label className="mt-10 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wide2 text-stone">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="border-b border-white/20 bg-transparent py-3 text-[15px] text-pearl outline-none transition-colors focus:border-gold"
          />
        </label>

        {error && <p className="mt-3 text-[13px] text-red-400">{error}</p>}
        {showDefaultHint && (
          <p className="mt-3 text-[12px] leading-relaxed text-stone">
            First run: the default password is{" "}
            <code className="text-gold">zewarefitrat123</code>. Set the{" "}
            <code className="text-gold">ADMIN_PASSWORD</code> environment
            variable to change it.
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-gold mt-8 w-full disabled:opacity-60">
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
