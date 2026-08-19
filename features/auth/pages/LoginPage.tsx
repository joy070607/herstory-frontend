"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/endpoints";
import type { ApiError } from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/constants/routes";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import type { Member } from "@/types/api.types";

// Render 무료 티어 백엔드는 오래 쉬면 콜드스타트로 최대 90초까지 걸릴 수 있는데,
// 이 경우 axios 타임아웃/네트워크 에러(응답 status 없음)로 잡혀서 실제 비밀번호
// 오류와 똑같은 문구가 뜨면 혼란스러우니 구분해서 안내합니다.
function resolveLoginErrorMessage(error: ApiError | null): string {
  if (!error) return "";
  if (error.status == null) {
    return "서버 응답이 지연되고 있어요 (콜드스타트일 수 있어요). 잠시 후 다시 시도해주세요.";
  }
  return error.message || "로그인에 실패했습니다.";
}

export function LoginPage() {
  const router = useRouter();
  const setMember = useAuthStore((state) => state.setMember);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const loginMutation = useMutation<Member, ApiError>({
    mutationFn: () => authApi.login({ email, password }),
    onSuccess: (member) => {
      setMember(member);
      router.push(ROUTES.home);
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center bg-sky-50 pb-9 pt-16">
        <Logo variant="full" className="w-56" />
      </div>

      <form
        className="flex flex-col gap-7 px-9 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate();
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-neutral-900">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
              required
              className="h-[52px] rounded-[10px] border border-neutral-300 px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-sky-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-neutral-900">
              비밀번호
            </label>
            <div className="flex h-[52px] items-center justify-between rounded-[10px] border border-neutral-300 px-4 focus-within:border-sky-500">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                required
                className="w-full text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-neutral-400"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-neutral-900">
            <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="peer absolute inset-0 h-full w-full appearance-none rounded-full border border-neutral-300 bg-white checked:border-sky-500 checked:bg-sky-500"
              />
              <svg
                className="pointer-events-none absolute h-2 w-2 opacity-0 peer-checked:opacity-100"
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
            로그인 유지
          </label>
          <Link href={ROUTES.forgotPassword} className="text-sm text-neutral-900">
            비밀번호 찾기
          </Link>
        </div>

        {loginMutation.isPending && (
          <p className="text-xs text-neutral-400">
            서버를 깨우는 중일 수 있어요. 최대 1분 정도 걸릴 수 있습니다.
          </p>
        )}

        {loginMutation.isError && (
          <p className="text-xs text-red-600">{resolveLoginErrorMessage(loginMutation.error)}</p>
        )}

        <div className="flex flex-col items-center gap-2.5">
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-[20px] bg-sky-500 py-[17px] text-lg font-bold text-sky-50 transition-colors hover:bg-sky-600 disabled:opacity-40"
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>
          <p className="text-sm">
            <span className="text-neutral-400">계정이 없으신가요? </span>
            <Link href={ROUTES.signup} className="text-sky-700">
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
