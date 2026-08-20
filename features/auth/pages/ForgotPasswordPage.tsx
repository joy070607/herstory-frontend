"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/endpoints";
import type { ApiError } from "@/api/client";
import { ROUTES } from "@/constants/routes";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/icons";

export function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const sendCodeMutation = useMutation({
    mutationFn: () => authApi.sendPhoneCode(phone),
    onSuccess: () => {
      setPhoneSent(true);
      setPhoneVerified(false);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: () => authApi.verifyPhoneCode({ phone, verificationCode }),
    onSuccess: (res) => setPhoneVerified(res.verified),
  });

  const resetMutation = useMutation<
    Awaited<ReturnType<typeof authApi.resetPassword>>,
    ApiError
  >({
    mutationFn: () => authApi.resetPassword({ email, newPassword: password }),
  });

  if (resetMutation.isSuccess) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-9 text-center">
        <p className="text-lg font-semibold text-neutral-900">
          {resetMutation.data.message || "비밀번호가 재설정되었습니다."}
        </p>
        <Link
          href={ROUTES.login}
          className="mt-2 rounded-[20px] bg-sky-500 px-8 py-3 text-sm font-semibold text-sky-50 transition-transform active:scale-95"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-center px-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="flex h-8 w-8 items-center justify-center text-neutral-900 transition-transform active:scale-90"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <form
        className="flex flex-col gap-7 px-9 pb-8 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!phoneVerified) return;
          if (password !== passwordConfirm) {
            setPasswordMismatch(true);
            return;
          }
          setPasswordMismatch(false);
          resetMutation.mutate();
        }}
      >
        <div>
          <h1 className="mb-1 text-xl font-bold text-neutral-900">비밀번호 찾기</h1>
          <p className="text-sm text-neutral-400">
            가입한 이메일과 휴대전화 인증 후 새 비밀번호를 설정할 수 있어요.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 border-b border-black/30 pb-1.5">
          <div className="flex items-center gap-2.5">
            <MailIcon className="text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
              className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2.5">
              <PhoneIcon className="text-neutral-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneSent(false);
                  setPhoneVerified(false);
                }}
                placeholder="휴대전화"
                required
                className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              onClick={() => sendCodeMutation.mutate()}
              disabled={!phone.trim() || sendCodeMutation.isPending || phoneVerified}
              className="shrink-0 rounded-full bg-sky-500 px-2.5 py-1.5 text-sm text-sky-50 transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100"
            >
              {phoneSent ? "재전송" : "인증번호 전송"}
            </button>
          </div>
          <div className="border-b border-black/30" />
          {sendCodeMutation.isError && (
            <p className="mt-1.5 text-xs text-red-600">인증번호 전송에 실패했습니다.</p>
          )}
        </div>

        {phoneSent && !phoneVerified && (
          <div>
            <div className="mb-1 flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-2.5">
                <PhoneIcon className="text-neutral-400" />
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="인증번호"
                  className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
                />
              </div>
              <button
                type="button"
                onClick={() => verifyCodeMutation.mutate()}
                disabled={!verificationCode.trim() || verifyCodeMutation.isPending}
                className="shrink-0 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm text-white transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100"
              >
                확인
              </button>
            </div>
            <div className="border-b border-black/30" />
            {verifyCodeMutation.isSuccess && !verifyCodeMutation.data.verified && (
              <p className="mt-1.5 text-xs text-red-600">인증번호가 일치하지 않습니다.</p>
            )}
            {verifyCodeMutation.isError && (
              <p className="mt-1.5 text-xs text-red-600">인증에 실패했습니다.</p>
            )}
          </div>
        )}

        {phoneVerified && (
          <p className="-mt-4 text-xs text-sky-600">휴대전화 인증이 완료되었습니다.</p>
        )}

        <div className="flex flex-col gap-1.5 border-b border-black/30 pb-1.5">
          <div className="flex items-center gap-2.5">
            <LockIcon className="text-neutral-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호"
              required
              disabled={!phoneVerified}
              className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-40"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0 text-neutral-300 transition-transform active:scale-90"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-b border-black/30 pb-1.5">
          <div className="flex items-center gap-2.5">
            <LockIcon className="text-neutral-400" />
            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="새 비밀번호 확인"
              required
              disabled={!phoneVerified}
              className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-40"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
              className="shrink-0 text-neutral-300 transition-transform active:scale-90"
              aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showPasswordConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {passwordMismatch && (
          <p className="-mt-4 text-xs text-red-600">비밀번호가 일치하지 않습니다.</p>
        )}

        {resetMutation.isError && (
          <p className="-mt-4 text-xs text-red-600">
            {resetMutation.error.message || "비밀번호 재설정에 실패했습니다."}
          </p>
        )}

        <button
          type="submit"
          disabled={!phoneVerified || resetMutation.isPending}
          className="w-full rounded-[20px] bg-sky-500 py-4 text-lg font-bold text-sky-50 transition-all hover:bg-sky-600 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
        >
          비밀번호 재설정
        </button>
      </form>
    </div>
  );
}
