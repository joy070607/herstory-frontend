"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ROUTES } from "@/constants/routes";
import { ChevronDownIcon, SearchIcon } from "@/components/icons";

type FaqCategory = "mileage" | "dutyFree" | "journey" | "account";

const CATEGORY_LABEL: Record<FaqCategory, string> = {
  mileage: "마일리지",
  dutyFree: "면세",
  journey: "여정",
  account: "계정",
};

const CATEGORIES: FaqCategory[] = ["mileage", "dutyFree", "journey", "account"];

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

// api연동 전 하드코딩 목업 데이터입니다.
const FAQ_ITEMS: FaqItem[] = [
  {
    id: "earn-timing",
    category: "mileage",
    question: "마일리지는 언제 적립되나요?",
    answer:
      "면세점 결제 후 영수증 등록 시 최대 3영업일 내 적립됩니다. 항공편 등록은 탑승 완료 후 익일 자동 적립됩니다.",
  },
  {
    id: "expiry",
    category: "mileage",
    question: "마일리지 유효기간이 있나요?",
    answer:
      "적립일로부터 5년이며, 소멸 예정 마일리지는 매월 1일 갱신되어 마이페이지 > 마일리지 상세 내역에서 확인하실 수 있습니다.",
  },
  {
    id: "transfer",
    category: "mileage",
    question: "가족에게 마일리지를 양도할 수 있나요?",
    answer:
      "GOLD 등급 이상부터 연 2회, 1회당 최대 30,000 마일까지 양도 가능합니다. 양도받는 분도 회원이어야 합니다.",
  },
  {
    id: "duty-free-limit",
    category: "dutyFree",
    question: "면세 한도는 어떻게 계산되나요?",
    answer:
      "1인당 미화 800달러 기준이며 주류·담배·향수는 별도 한도가 적용됩니다. 결제 화면에서 실시간으로 잔여 한도를 확인하실 수 있습니다.",
  },
  {
    id: "pickup",
    category: "dutyFree",
    question: "구매한 상품은 어디서 받나요?",
    answer:
      "출국장 인도장 또는 부티크 현장 수령 중 선택하실 수 있습니다. 인도장 수령 시 탑승 게이트 기준 가까운 곳이 자동 안내됩니다.",
  },
  {
    id: "passport",
    category: "account",
    question: "여권 정보는 왜 등록해야 하나요?",
    answer:
      "면세 구매는 법령상 여권 확인이 필요합니다. 미리 등록하시면 결제 시 자동 입력되어 대기 시간이 줄어듭니다.",
  },
  {
    id: "flight-change",
    category: "journey",
    question: "항공편이 변경되면 여정도 자동으로 바뀌나요?",
    answer:
      "항공사에서 변경 정보를 수신하면 자동 갱신되며, 게이트 · 탑승 시각 변경 시 알림을 보내드립니다. 알림 설정에서 켜고 끌 수 있습니다.",
  },
  {
    id: "withdrawal",
    category: "account",
    question: "탈퇴하면 마일리지는 어떻게 되나요?",
    answer: "탈퇴 시 보유 마일리지와 쿠폰은 즉시 소멸되며 복구할 수 없습니다. 소멸 전 사용을 권장드립니다.",
  },
];

type Feedback = "helpful" | "unhelpful";

function FaqRow({
  item,
  open,
  onToggle,
  feedback,
  onFeedback,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  feedback?: Feedback;
  onFeedback: (feedback: Feedback) => void;
}) {
  return (
    <div className={`rounded-2xl border ${open ? "border-sky-500" : "border-neutral-200"} bg-white`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600">
          Q
        </span>
        <span className="flex-1 text-sm font-medium text-neutral-900">{item.question}</span>
        <ChevronDownIcon
          className={`h-2 w-3.5 shrink-0 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4">
          <div className="flex items-start gap-3 rounded-xl bg-sky-50 p-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
              A
            </span>
            <p className="text-sm leading-relaxed text-neutral-700">{item.answer}</p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-neutral-400">도움이 되었나요?</span>
            <button
              type="button"
              onClick={() => onFeedback("helpful")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                feedback === "helpful"
                  ? "bg-sky-500 text-white"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              도움됨
            </button>
            <button
              type="button"
              onClick={() => onFeedback("unhelpful")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                feedback === "unhelpful"
                  ? "bg-neutral-700 text-white"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              아쉬움
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [feedbackById, setFeedbackById] = useState<Record<string, Feedback>>({});

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesKeyword =
        keyword === "" ||
        item.question.toLowerCase().includes(keyword) ||
        item.answer.toLowerCase().includes(keyword);
      return matchesCategory && matchesKeyword;
    });
  }, [search, activeCategory]);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">자주 묻는 질문</h1>
        </div>
        <p className="-mt-3 text-sm text-neutral-400">가장 많이 찾으시는 질문을 모았습니다.</p>

        <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
          <SearchIcon className="h-4 w-4 shrink-0 text-neutral-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="궁금한 내용을 검색해 보세요"
            className="w-full text-sm text-neutral-900 outline-none placeholder:text-neutral-300"
          />
        </div>

        <div className="-mx-6 flex gap-2 overflow-x-auto px-6">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-sky-500 text-white"
                : "border border-neutral-200 bg-white text-neutral-600"
            }`}
          >
            전체
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-sky-500 text-white"
                  : "border border-neutral-200 bg-white text-neutral-600"
              }`}
            >
              {CATEGORY_LABEL[category]}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
              <p className="text-sm font-medium text-neutral-500">검색 결과가 없어요</p>
              <p className="text-xs text-neutral-400">다른 키워드로 검색해보시겠어요?</p>
            </div>
          )}
          {filteredItems.map((item) => (
            <FaqRow
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              feedback={feedbackById[item.id]}
              onFeedback={(feedback) =>
                setFeedbackById((prev) => ({ ...prev, [item.id]: feedback }))
              }
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#E8F6FD] px-5 py-5 text-center">
          <p className="text-sm font-medium text-neutral-900">원하는 답변이 없나요?</p>
          <Link
            href={ROUTES.myPageInquiry}
            className="w-full rounded-full bg-sky-500 py-3.5 text-sm font-bold text-white"
          >
            1:1 문의하기
          </Link>
        </div>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
