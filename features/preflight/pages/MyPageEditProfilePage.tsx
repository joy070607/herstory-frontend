"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/endpoints";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useMemberProfile, useUpdateProfile } from "@/hooks/queries";
import { Lock2Icon } from "@/components/icons";

function LockedField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-sm text-neutral-900">{label}</p>
      <div className="flex items-center justify-between rounded-2xl border border-sky-700/30 bg-[#E8F6FD] p-4">
        <span className="text-lg text-neutral-900">{value}</span>
        <Lock2Icon className="h-4 w-3.5 shrink-0" />
      </div>
    </div>
  );
}

export function MyPageEditProfilePage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: profile } = useMemberProfile(memberId);
  const updateProfileMutation = useUpdateProfile(memberId);

  const hasSyncedForm = useRef(false);
  const [englishName, setEnglishName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profile && !hasSyncedForm.current) {
      setEnglishName(profile.englishName);
      setEmail(profile.email);
      hasSyncedForm.current = true;
    }
  }, [profile]);

  // 휴대폰 번호는 실제 인증 API(/auth/phone/send-code, /auth/phone/verify-code)로 검증하고,
  // 검증에 성공한 번호를 화면에 바로 반영합니다 (회원정보 수정 API는 영문 이름·이메일만 다룹니다).
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const phone = verifiedPhone ?? profile?.phone ?? "-";
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const sendCodeMutation = useMutation({
    mutationFn: () => authApi.sendPhoneCode(newPhone),
    onSuccess: () => {
      setPhoneSent(true);
      setPhoneVerified(false);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: () => authApi.verifyPhoneCode({ phone: newPhone, verificationCode }),
    onSuccess: (data) => {
      setPhoneVerified(data.verified);
      if (data.verified) {
        setVerifiedPhone(newPhone);
        setEditingPhone(false);
        setPhoneSent(false);
        setNewPhone("");
        setVerificationCode("");
      }
    },
  });

  const cancelPhoneEdit = () => {
    setEditingPhone(false);
    setNewPhone("");
    setVerificationCode("");
    setPhoneSent(false);
    setPhoneVerified(false);
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">회원정보 수정</h1>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E6F7FF]/50 bg-sky-500">
            <span className="text-4xl font-bold text-[#E6F7FF]">
              {(profile?.name ?? member?.name)?.charAt(0) ?? "-"}
            </span>
          </div>
        </div>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfileMutation.mutate({ englishName, email });
          }}
        >
          <LockedField label="이름" value={profile?.name ?? member?.name ?? "-"} />

          <div>
            <p className="mb-2 text-sm text-neutral-900">영문 이름 (여권)</p>
            <input
              type="text"
              value={englishName}
              onChange={(e) => {
                setEnglishName(e.target.value);
                updateProfileMutation.reset();
              }}
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none"
            />
            <p className="mt-1.5 text-[13px] text-neutral-400">
              여권과 동일하게 입력해 주세요. 항공편 등록 시 사용됩니다.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">이메일</p>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                updateProfileMutation.reset();
              }}
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none"
            />
            <p className="mt-1.5 text-[13px] text-neutral-400">이메일 변경 시 재인증이 필요합니다.</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">휴대폰 번호</p>

            {!editingPhone ? (
              <div className="flex items-center justify-between rounded-2xl border border-black/50 px-4 py-5">
                <span className="text-lg text-neutral-900">{phone}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#44C67C]">인증 완료</span>
                  <button
                    type="button"
                    onClick={() => setEditingPhone(true)}
                    className="text-xs font-medium text-sky-600 underline transition-transform active:scale-95"
                  >
                    번호 변경
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 rounded-2xl border border-black/50 p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => {
                      setNewPhone(e.target.value);
                      setPhoneSent(false);
                      setPhoneVerified(false);
                    }}
                    placeholder="새 휴대폰 번호"
                    className="w-full flex-1 text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => sendCodeMutation.mutate()}
                    disabled={!newPhone.trim() || sendCodeMutation.isPending}
                    className="shrink-0 rounded-full bg-sky-500 px-2.5 py-1.5 text-sm text-sky-50 transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100"
                  >
                    {phoneSent ? "재전송" : "인증번호 전송"}
                  </button>
                </div>
                {sendCodeMutation.isError && (
                  <p className="text-xs text-red-600">인증번호 전송에 실패했습니다.</p>
                )}

                {phoneSent && !phoneVerified && (
                  <div className="flex items-center gap-2 border-t border-black/10 pt-2.5">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="인증번호"
                      className="w-full flex-1 text-lg text-neutral-900 outline-none placeholder:text-neutral-400"
                    />
                    <button
                      type="button"
                      onClick={() => verifyCodeMutation.mutate()}
                      disabled={!verificationCode.trim() || verifyCodeMutation.isPending}
                      className="shrink-0 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm text-white transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100"
                    >
                      확인
                    </button>
                  </div>
                )}
                {verifyCodeMutation.isSuccess && !verifyCodeMutation.data.verified && (
                  <p className="text-xs text-red-600">인증번호가 일치하지 않습니다.</p>
                )}
                {verifyCodeMutation.isError && (
                  <p className="text-xs text-red-600">인증에 실패했습니다.</p>
                )}

                <button
                  type="button"
                  onClick={cancelPhoneEdit}
                  className="self-start text-xs text-neutral-400 underline transition-transform active:scale-95"
                >
                  취소
                </button>
              </div>
            )}
          </div>

          <LockedField label="생년월일" value={profile?.birthDate ?? "-"} />

          <p className="text-[13px] leading-relaxed text-neutral-400">
            이름과 생년월일은 본인 인증 정보와 연결되어 있어 고객센터를 통해서만 변경할 수 있습니다.
          </p>

          {updateProfileMutation.isSuccess && (
            <p className="text-center text-sm font-medium text-sky-600">변경사항이 저장되었습니다.</p>
          )}
          {updateProfileMutation.isError && (
            <p className="text-center text-sm font-medium text-red-600">
              저장에 실패했습니다. 다시 시도해 주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="rounded-[25px] bg-sky-500 py-3.5 text-center text-lg font-bold text-[#E6F7FF] transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
          >
            {updateProfileMutation.isPending ? "저장 중..." : "변경사항 저장"}
          </button>
        </form>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
