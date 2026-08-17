"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/endpoints";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/constants/routes";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@/components/icons";

interface Terms {
  age: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

const REQUIRED_TERMS: (keyof Terms)[] = ["age", "service", "privacy"];

function SquareCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer absolute inset-0 h-full w-full appearance-none rounded-[4px] border border-neutral-900 bg-white checked:border-sky-500 checked:bg-sky-500"
      />
      <svg
        className="pointer-events-none absolute h-2.5 w-2.5 opacity-0 peer-checked:opacity-100"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 6.3L5 8.8L9.5 3.3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function RegisterPage() {
  const router = useRouter();
  const setMember = useAuthStore((state) => state.setMember);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [terms, setTerms] = useState<Terms>({
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const allTermsChecked = Object.values(terms).every(Boolean);
  const requiredTermsChecked = REQUIRED_TERMS.every((key) => terms[key]);

  const toggleAllTerms = (checked: boolean) => {
    setTerms({ age: checked, service: checked, privacy: checked, marketing: checked });
  };

  const registerMutation = useMutation({
    mutationFn: () => authApi.register({ email, password, name, phone }),
    onSuccess: (member) => {
      setMember(member);
      router.push(ROUTES.hub);
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader showMenu={false} />

      <form
        className="flex flex-col px-6 pb-8 pt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== passwordConfirm) {
            setPasswordMismatch(true);
            return;
          }
          setPasswordMismatch(false);
          registerMutation.mutate();
        }}
      >
        <div className="mb-9 border-b border-black/30 pb-1.5">
          <div className="flex items-center gap-2.5">
            <UserIcon className="text-neutral-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              required
              className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="mb-8 border-b border-black/30 pb-1.5">
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

        <div className="mb-5">
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2.5">
              <PhoneIcon className="text-neutral-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="휴대전화"
                required
                className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full bg-sky-500 px-2.5 py-1.5 text-sm text-sky-50"
            >
              인증번호 전송
            </button>
          </div>
          <div className="border-b border-black/30" />
        </div>

        <div className="mb-10">
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
              className="shrink-0 rounded-full bg-sky-500 px-3.5 py-1.5 text-sm text-sky-50"
            >
              재전송
            </button>
          </div>
          <div className="border-b border-black/30" />
        </div>

        <div className="mb-6">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2.5">
              <LockIcon className="text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0 text-neutral-300"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className="border-b border-black/30" />
        </div>

        <div className="mb-8">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2.5">
              <LockIcon className="text-neutral-400" />
              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호 확인"
                required
                className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
              className="shrink-0 text-neutral-300"
              aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showPasswordConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className="border-b border-black/30" />
        </div>

        {passwordMismatch && (
          <p className="mb-6 -mt-4 text-xs text-red-600">비밀번호가 일치하지 않습니다.</p>
        )}

        <h2 className="mb-2 text-base text-neutral-900">서비스 정책</h2>
        <div className="mb-6 rounded-[10px] bg-black/[0.05] pt-5">
          <label className="mb-4 flex items-center gap-2.5 px-5">
            <SquareCheckbox checked={allTermsChecked} onChange={toggleAllTerms} />
            <span className="text-sm text-neutral-900">전체 동의</span>
          </label>
          <div className="mb-4 border-t border-[#BEC7D4]" />
          <div className="flex flex-col gap-4 px-5 pb-5">
            <label className="flex items-center gap-2.5">
              <SquareCheckbox
                checked={terms.age}
                onChange={(checked) => setTerms((prev) => ({ ...prev, age: checked }))}
              />
              <span className="text-sm text-neutral-900">만 14세 이상입니다. (필수)</span>
            </label>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5">
                <SquareCheckbox
                  checked={terms.service}
                  onChange={(checked) => setTerms((prev) => ({ ...prev, service: checked }))}
                />
                <span className="text-sm text-neutral-900">서비스 이용약관 동의 (필수)</span>
              </label>
              <span className="text-sm text-neutral-900 underline">내용보기</span>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5">
                <SquareCheckbox
                  checked={terms.privacy}
                  onChange={(checked) => setTerms((prev) => ({ ...prev, privacy: checked }))}
                />
                <span className="text-sm text-neutral-900">개인정보 수집 및 이용 동의 (필수)</span>
              </label>
              <span className="text-sm text-neutral-900 underline">내용보기</span>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5">
                <SquareCheckbox
                  checked={terms.marketing}
                  onChange={(checked) => setTerms((prev) => ({ ...prev, marketing: checked }))}
                />
                <span className="text-sm text-neutral-900">마케팅 수신 동의 (선택)</span>
              </label>
              <span className="text-sm text-neutral-900 underline">내용보기</span>
            </div>
          </div>
        </div>

        {registerMutation.isError && (
          <p className="mb-4 text-xs text-red-600">회원가입에 실패했습니다.</p>
        )}

        <button
          type="submit"
          disabled={!requiredTermsChecked || registerMutation.isPending}
          className="mb-5 w-full rounded-[20px] bg-sky-500 py-4 text-lg font-bold text-sky-50 transition-colors hover:bg-sky-600 disabled:opacity-40"
        >
          회원가입
        </button>

        <Link href={ROUTES.login} className="text-lg text-neutral-900 underline">
          뒤로가기
        </Link>
      </form>
    </div>
  );
}
