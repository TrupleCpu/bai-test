"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { I } from "@/components/icons";
import { Button, Card, Field, TextInput } from "@/components/ui";

export default function ActivatePage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = params.token ?? "…";
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const tooShort = pw.length < 8;
  const mismatch = confirm.length > 0 && confirm !== pw;
  const valid = !tooShort && !mismatch && confirm.length > 0;

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

      {done ? (
        <Card pad="p-6" className="w-full max-w-md text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-positive/10 text-positive">
            <I.Check className="size-7" />
          </span>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-navy">Account activated</h1>
          <p className="mt-2 text-sm text-muted">
            Your invite has been linked and your password is set. You can now log in to track your
            applications.
          </p>
          <Button className="mt-6 w-full" onClick={() => router.push("/login")}>
            <I.Logout className="size-4 rotate-180" />
            Continue to log in
          </Button>
        </Card>
      ) : (
        <Card pad="p-6" className="w-full max-w-md">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <I.Mail className="size-4" />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-navy">Activate your account</h1>
              <p className="text-xs text-muted">Invite token · {token}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Welcome to the BAI Finance secure portal. Choose a password to complete your activation.
            You&apos;ll be able to log in and track your application status.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setDone(true);
            }}
            className="mt-6 grid gap-4"
          >
            <Field label="Password" hint={tooShort ? "At least 8 characters required" : "At least 8 characters — we check against known breaches"}>
              <TextInput type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
            </Field>
            <Field label="Confirm password" hint={mismatch ? "Passwords don't match" : undefined}>
              <TextInput type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </Field>
            <Button type="submit" disabled={!valid} className="w-full">
              <I.Check className="size-4" />
              Activate account
            </Button>
          </form>
          <p className="mt-4 flex items-start gap-1.5 text-xs text-muted">
            <I.Lock className="mt-0.5 size-3.5 shrink-0 text-positive" />
            Activation links are single-use and expire after 30 days. If yours has expired, request a
            new invite from your broker.
          </p>
        </Card>
      )}
    </div>
  );
}