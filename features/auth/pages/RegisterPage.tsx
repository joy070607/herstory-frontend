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

type ViewableTerm = "service" | "privacy" | "marketing";

const TERMS_CONTENT: Record<ViewableTerm, { title: string; body: string }> = {
  service: {
    title: "서비스 이용약관",
    body: `제1조 (목적)
이 약관은 HER-STORY(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (회원가입)
회원가입은 이용자가 약관 내용에 동의하고 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 가입을 신청하면, 회사가 이를 승낙함으로써 체결됩니다.

제3조 (서비스의 제공)
회사는 공항 라운지 안내, 여정 관리, 상품 추천 등의 서비스를 회원에게 제공하며, 서비스의 내용은 회사 사정에 따라 변경될 수 있습니다.

제4조 (회원의 의무)
회원은 관계 법령과 이 약관의 규정을 준수해야 하며, 타인의 정보를 도용하거나 회사의 서비스 운영을 방해해서는 안 됩니다.`,
  },
  privacy: {
    title: "개인정보 수집 및 이용 동의",
    body: `1. 수집 항목
이름, 이메일 주소, 휴대전화번호, 비밀번호

2. 수집 목적
회원 가입 및 본인 확인, 서비스 제공 및 상담, 부정 이용 방지

3. 보유 및 이용 기간
회원 탈퇴 시까지 보유하며, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.

4. 동의 거부 권리 안내
회원은 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 다만 필수 항목에 동의하지 않을 경우 서비스 이용에 제한이 있을 수 있습니다.`,
  },
  marketing: {
    title: "마케팅 정보 수신 동의",
    body: `1. 수신 목적
이벤트 및 프로모션 안내, 신규 서비스 소식, 맞춤형 혜택 정보 제공

2. 수신 방법
이메일, 앱 푸시 알림

3. 동의는 선택 사항이며, 동의하지 않아도 서비스 이용에 제한이 없습니다.

4. 동의 이후에도 마이페이지 또는 설정 메뉴에서 언제든지 수신을 거부할 수 있습니다.`,
  },
};

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
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [activeTerm, setActiveTerm] = useState<ViewableTerm | null>(null);
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

  const sendCodeMutation = useMutation({
    mutationFn: () => authApi.sendPhoneCode(phone),
    onSuccess: () => setCodeSent(true),
  });

  const verifyCodeMutation = useMutation({
    mutationFn: () => authApi.verifyPhoneCode({ phone, verificationCode }),
    onSuccess: (data) => setPhoneVerified(data.verified),
  });

  const registerMutation = useMutation({
    mutationFn: () => authApi.register({ email, password, name, phone }),
    onSuccess: (member) => {
      setMember(member);
      router.push(ROUTES.home);
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader showMenuButton={false} />

      <form
        className="flex flex-col px-6 pb-8 pt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!phoneVerified) {
            return;
          }
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
                onChange={(e) => {
                  setPhone(e.target.value);
                  setCodeSent(false);
                  sendCodeMutation.reset();
                  setVerificationCode("");
                  setPhoneVerified(false);
                  verifyCodeMutation.reset();
                }}
                placeholder="휴대전화"
                required
                className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>
            <button
              type="button"
              onClick={() => sendCodeMutation.mutate()}
              disabled={!phone || sendCodeMutation.isPending}
              className="shrink-0 rounded-full bg-sky-500 px-2.5 py-1.5 text-sm text-sky-50 disabled:opacity-40"
            >
              {sendCodeMutation.isPending ? "전송 중..." : "인증번호 전송"}
            </button>
          </div>
          <div className="border-b border-black/30" />
          {codeSent && (
            <p className="mt-1 text-xs text-sky-600">인증번호가 전송되었습니다.</p>
          )}
          {sendCodeMutation.isError && (
            <p className="mt-1 text-xs text-red-600">인증번호 전송에 실패했습니다.</p>
          )}
        </div>

        <div className="mb-10">
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2.5">
              <PhoneIcon className="text-neutral-400" />
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  setPhoneVerified(false);
                  verifyCodeMutation.reset();
                }}
                placeholder="인증번호"
                disabled={phoneVerified}
                className="w-full text-lg text-neutral-900 outline-none placeholder:text-neutral-400 disabled:text-neutral-400"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => verifyCodeMutation.mutate()}
                disabled={!verificationCode || phoneVerified || verifyCodeMutation.isPending}
                className="shrink-0 rounded-full bg-sky-500 px-3.5 py-1.5 text-sm text-sky-50 disabled:opacity-40"
              >
                {verifyCodeMutation.isPending ? "확인 중..." : "확인"}
              </button>
              <button
                type="button"
                onClick={() => sendCodeMutation.mutate()}
                disabled={!phone || sendCodeMutation.isPending || phoneVerified}
                className="shrink-0 rounded-full bg-sky-500 px-3.5 py-1.5 text-sm text-sky-50 disabled:opacity-40"
              >
                재전송
              </button>
            </div>
          </div>
          <div className="border-b border-black/30" />
          {verifyCodeMutation.data && (
            <p
              className={`mt-1 text-xs ${
                verifyCodeMutation.data.verified ? "text-sky-600" : "text-red-600"
              }`}
            >
              {verifyCodeMutation.data.message}
            </p>
          )}
          {verifyCodeMutation.isError && (
            <p className="mt-1 text-xs text-red-600">인증번호 확인에 실패했습니다.</p>
          )}
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
              <button
                type="button"
                onClick={() => setActiveTerm("service")}
                className="text-sm text-neutral-900 underline"
              >
                내용보기
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5">
                <SquareCheckbox
                  checked={terms.privacy}
                  onChange={(checked) => setTerms((prev) => ({ ...prev, privacy: checked }))}
                />
                <span className="text-sm text-neutral-900">개인정보 수집 및 이용 동의 (필수)</span>
              </label>
              <button
                type="button"
                onClick={() => setActiveTerm("privacy")}
                className="text-sm text-neutral-900 underline"
              >
                내용보기
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5">
                <SquareCheckbox
                  checked={terms.marketing}
                  onChange={(checked) => setTerms((prev) => ({ ...prev, marketing: checked }))}
                />
                <span className="text-sm text-neutral-900">마케팅 수신 동의 (선택)</span>
              </label>
              <button
                type="button"
                onClick={() => setActiveTerm("marketing")}
                className="text-sm text-neutral-900 underline"
              >
                내용보기
              </button>
            </div>
          </div>
        </div>

        {registerMutation.isError && (
          <p className="mb-4 text-xs text-red-600">회원가입에 실패했습니다.</p>
        )}

        <button
          type="submit"
          disabled={!phoneVerified || !requiredTermsChecked || registerMutation.isPending}
          className="mb-5 w-full rounded-[20px] bg-sky-500 py-4 text-lg font-bold text-sky-50 transition-colors hover:bg-sky-600 disabled:opacity-40"
        >
          회원가입
        </button>

        <Link href={ROUTES.login} className="text-lg text-neutral-900 underline">
          뒤로가기
        </Link>
      </form>

      {activeTerm && (
        <div
          className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col justify-end bg-black/40"
          onClick={() => setActiveTerm(null)}
        >
          <div
            className="max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900">
                {TERMS_CONTENT[activeTerm].title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveTerm(null)}
                aria-label="닫기"
                className="text-neutral-400"
              >
                ✕
              </button>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-600">
              {TERMS_CONTENT[activeTerm].body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
