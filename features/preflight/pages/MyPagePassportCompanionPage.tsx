"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { UserPlusIcon } from "@/components/icons";

type Relation = "배우자" | "자녀" | "부모" | "형제 · 자매" | "기타";

const RELATIONS: Relation[] = ["배우자", "자녀", "부모", "형제 · 자매", "기타"];

interface Companion {
  id: string;
  name: string;
  englishName: string;
  birthDate: string;
  relation: Relation;
}

// 탑승객 추가에 대응하는 백엔드 API가 아직 없어 이 화면은 세션 내에서만 유지되는
// 하드코딩 목업입니다.
export function MyPagePassportCompanionPage() {
  const [companions, setCompanions] = useState<Companion[]>([]);

  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [relation, setRelation] = useState<Relation>("배우자");

  const canSubmit = name.trim() !== "" && englishName.trim() !== "" && birthDate.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setCompanions((prev) => [
      { id: `companion-${Date.now()}`, name: name.trim(), englishName: englishName.trim(), birthDate: birthDate.trim(), relation },
      ...prev,
    ]);
    setName("");
    setEnglishName("");
    setBirthDate("");
    setRelation("배우자");
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">탑승객 추가</h1>
        </div>
        <p className="-mt-4 text-sm text-neutral-400">
          가족 · 동반자 정보를 등록하면 항공편 등록과 면세 구매 시 함께 이용할 수 있어요.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <p className="mb-2 text-sm text-neutral-900">관계</p>
            <div className="flex flex-wrap gap-2">
              {RELATIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRelation(option)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    relation === option
                      ? "bg-sky-500 text-white"
                      : "border border-neutral-200 bg-white text-neutral-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">이름</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 김노마드"
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-300"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">영문 이름 (여권)</p>
            <input
              type="text"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              placeholder="KIM NOMAD"
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-300"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-neutral-900">생년월일</p>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              className="w-full rounded-2xl border border-black/50 px-4 py-5 text-lg text-neutral-900 outline-none placeholder:text-neutral-300"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-[25px] bg-sky-500 py-3.5 text-center text-lg font-bold text-[#E6F7FF] disabled:opacity-40"
          >
            탑승객 추가
          </button>
        </form>

        {companions.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-neutral-900">등록된 탑승객 {companions.length}명</p>
            {companions.map((companion) => (
              <div key={companion.id} className="flex items-center gap-3.5 rounded-2xl bg-neutral-50 px-4 py-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D1EDFB] text-sky-500">
                  <UserPlusIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">
                    {companion.name} / {companion.englishName}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    {companion.relation} · {companion.birthDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
