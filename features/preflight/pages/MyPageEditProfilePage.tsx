"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { LockIcon } from "@/components/icons";

// api연동 전 하드코딩 목업 데이터입니다.
const INITIAL_PROFILE = {
  name: "김노마드",
  englishName: "KIM NOMAD",
  email: "nomad@her-story.com",
  phone: "010-2456-8890",
  birthDate: "1994-03-08",
};

function LockedField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-sm text-neutral-900">{label}</p>
      <div className="flex items-center justify-between rounded-2xl border border-sky-700/30 bg-[#E8F6FD] p-4">
        <span className="text-lg text-neutral-900">{value}</span>
        <LockIcon className="h-4 w-3.5 shrink-0 text-neutral-400" />
      </div>
    </div>
  );
}

export function MyPageEditProfilePage() {
  const [englishName, setEnglishName] = useState(INITIAL_PROFILE.englishName);
  const [email, setEmail] = useState(INITIAL_PROFILE.email);
  const [saved, setSaved] = useState(false);

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
            <span className="text-4xl font-bold text-[#E6F7FF]">김</span>
          </div>
        </div>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <LockedField label="이름" value={INITIAL_PROFILE.name} />

          <div>
            <p className="mb-2 text-sm text-neutral-900">영문 이름 (여권)</p>
            <input
              type="text"
              value={englishName}
              onChange={(e) => {
                setEnglishName(e.target.value);
                setSaved(false);
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
                setSaved(false);
              }}
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none"
            />
            <p className="mt-1.5 text-[13px] text-neutral-400">이메일 변경 시 재인증이 필요합니다.</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">휴대폰 번호</p>
            <div className="flex items-center justify-between rounded-2xl border border-black/50 px-4 py-5">
              <span className="text-lg text-neutral-900">{INITIAL_PROFILE.phone}</span>
              <span className="text-sm text-[#44C67C]">인증 완료</span>
            </div>
          </div>

          <LockedField label="생년월일" value={INITIAL_PROFILE.birthDate} />

          <p className="text-[13px] leading-relaxed text-neutral-400">
            이름과 생년월일은 본인 인증 정보와 연결되어 있어 고객센터를 통해서만 변경할 수 있습니다.
          </p>

          {saved && (
            <p className="text-center text-sm font-medium text-sky-600">변경사항이 저장되었습니다.</p>
          )}

          <button
            type="submit"
            className="rounded-[25px] bg-sky-500 py-3.5 text-center text-lg font-bold text-[#E6F7FF]"
          >
            변경사항 저장
          </button>
        </form>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
