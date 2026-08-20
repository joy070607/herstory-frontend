"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ROUTES } from "@/constants/routes";
import { CheckCircleIcon } from "@/components/icons";

function RequirementRow({ label, satisfied }: { label: string; satisfied: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckCircleIcon className={`h-5 w-5 shrink-0 ${satisfied ? "text-sky-500" : "text-neutral-300"}`} />
      <span className={`text-sm ${satisfied ? "text-neutral-900" : "text-neutral-400"}`}>{label}</span>
    </div>
  );
}

export function MyPagePasswordResetPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const hasMinLength = newPassword.length >= 8;
  const hasLettersAndDigits = /[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit = currentPassword.length > 0 && hasMinLength && hasLettersAndDigits && passwordsMatch;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">비밀번호 재설정</h1>
        </div>

        <p className="text-sm leading-relaxed text-neutral-400">
          현재 비밀번호를 확인한 뒤 새 비밀번호를 설정합니다.
          <br />
          변경 후 다른 기기에서는 다시 로그인해야 합니다.
        </p>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            setSaved(true);
          }}
        >
          <div>
            <p className="mb-2 text-sm text-neutral-900">현재 비밀번호</p>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setSaved(false);
              }}
              placeholder="현재 비밀번호 입력"
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">새 비밀번호</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setSaved(false);
              }}
              placeholder="영문 · 숫자 · 특수문자 조합"
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">새 비밀번호 확인</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setSaved(false);
              }}
              placeholder="다시 한 번 입력"
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4">
            <RequirementRow label="8자 이상" satisfied={hasMinLength} />
            <RequirementRow label="영문과 숫자 포함" satisfied={hasLettersAndDigits} />
            <RequirementRow label="새 비밀번호 일치" satisfied={passwordsMatch} />
          </div>

          <Link
            href={ROUTES.forgotPassword}
            className="text-center text-sm text-neutral-400 underline underline-offset-2"
          >
            현재 비밀번호를 잊으셨나요? 이메일로 재설정 링크 받기
          </Link>

          {saved && (
            <p className="text-center text-sm font-medium text-sky-600">비밀번호가 변경되었습니다.</p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-[25px] bg-sky-500 py-3.5 text-center text-lg font-bold text-[#E6F7FF] disabled:opacity-40"
          >
            비밀번호 변경
          </button>
        </form>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
