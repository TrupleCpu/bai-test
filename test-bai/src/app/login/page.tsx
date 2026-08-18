"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { I } from "@/components/icons";
import { Button, Card, Field, TextInput } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfa, setMfa] = useState(false);
  const [code, setCode] = useState("");

  const canSubmit = mfa ? /^\d{6}$/.test(code) : email.includes("@") && password.length >= 8;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-navy text-white shadow">
          <I.ShieldCheck className="size-6" />
        </span>
        <div className="leading-tight">
          <div className="text-lg font-bold tracking-tight text-navy">BAI Finance</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Secure Portal</div>
        </div>
      </Link>

      <Card pad="p-6" className="w-full max-w-md">
        <h1 className="text-xl font-bold tracking-tight text-navy">{mfa ? "Verify it's you" : "Log in to your portal"}</h1>
        <p className="mt-1 text-sm text-muted">
          {mfa
            ? "Enter the 6-digit code from your authenticator app."
            : "Access is invite-only — accounts are set up by the Compliance Team."}
        </p>

        {!mfa ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMfa(true);
            }}
            className="mt-6 grid gap-4"
          >
            <Field label="Email address">
              <TextInput type="email" autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Password" hint="At least 8 characters">
              <TextInput type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-muted">
                <input type="checkbox" className="size-4 rounded border-ink/25" defaultChecked />
                Remember this device
              </label>
              <Link href="/activate/expired" className="font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" disabled={!canSubmit} className="w-full">
              <I.Logout className="size-4 rotate-180" />
              Continue
            </Button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/client");
            }}
            className="mt-6 grid gap-4"
          >
            <Field label="6-digit security code">
              <TextInput
                inputMode="numeric"
                maxLength={6}
                placeholder="······"
                className="text-center font-mono text-lg tracking-[0.5em]"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              />
            </Field>
            <div className="flex items-center gap-2 text-xs text-muted">
              <I.ShieldCheck className="size-4 text-positive" />
              MFA keeps your application data protected.
            </div>
            <Button type="submit" disabled={!canSubmit} className="w-full">
              <I.Check className="size-4" />
              Verify &amp; log in
            </Button>
            <button
              type="button"
              onClick={() => setMfa(false)}
              className="text-center text-xs font-semibold text-muted hover:text-navy"
            >
              Back to email &amp; password
            </button>
          </form>
        )}
      </Card>

      <div className="mt-6 max-w-md space-y-2 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
          <I.Lock className="size-3.5 text-positive" />
          TLS-secured · failed attempts trigger temporary lockout
        </p>
        <p className="text-xs text-muted">
          Need an account?{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            Contact your broker
          </Link>{" "}
          — there is no public self-registration.
        </p>
      </div>
    </div>
  );
}