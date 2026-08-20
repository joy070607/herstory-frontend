"use client";

import { useRef, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { ChevronDownIcon, PlusIcon } from "@/components/icons";

type InquiryStatus = "answered" | "waiting";
type InquiryType = "마일리지" | "면세 · 결제" | "여정 · 항공편" | "계정 · 로그인" | "기타";

interface Inquiry {
  id: string;
  status: InquiryStatus;
  date: string;
  title: string;
  answer?: string;
}

const INQUIRY_TYPES: InquiryType[] = ["마일리지", "면세 · 결제", "여정 · 항공편", "계정 · 로그인", "기타"];

// api연동 전 하드코딩 목업 데이터입니다.
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    status: "answered",
    date: "2026.10.16",
    title: "10월 14일 면세 구매 마일리지 미적립",
    answer: "영수증 확인 결과 4,200 마일이 정상 적립되었습니다. 반영까지 최대 3영업일 소요된 점 안내드립니다.",
  },
  {
    id: "inq-2",
    status: "answered",
    date: "2026.09.28",
    title: "여권 영문 이름 수정 요청",
    answer: "본인 인증 확인 후 수정 완료되었습니다. 다음 항공편 등록 시 자동 반영됩니다.",
  },
  {
    id: "inq-3",
    status: "waiting",
    date: "2026.10.18",
    title: "라운지 이용권 사용 방법",
  },
];

const STATUS_LABEL: Record<InquiryStatus, string> = {
  answered: "답변 완료",
  waiting: "답변 대기",
};

function InquiryCard({
  inquiry,
  open,
  onToggle,
}: {
  inquiry: Inquiry;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3.5 shadow-sm">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 text-left">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                inquiry.status === "answered"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {STATUS_LABEL[inquiry.status]}
            </span>
            <span className="text-xs text-neutral-400">{inquiry.date}</span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-neutral-900">{inquiry.title}</p>
        </div>
        <ChevronDownIcon
          className={`h-2 w-3.5 shrink-0 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 rounded-xl bg-sky-50 p-3.5">
          {inquiry.answer ? (
            <>
              <p className="mb-1 text-xs font-semibold text-sky-600">HER-STORY</p>
              <p className="text-sm leading-relaxed text-neutral-700">{inquiry.answer}</p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-neutral-500">
              담당자가 확인 중이에요. 답변이 등록되면 알려드릴게요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function todayLabel() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
}

export function InquiryPage() {
  const [tab, setTab] = useState<"history" | "new">("history");
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [openId, setOpenId] = useState<string | null>(null);

  const [type, setType] = useState<InquiryType>("마일리지");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const names = Array.from(files).map((file) => file.name);
    setAttachments((prev) => [...prev, ...names].slice(0, 3));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      status: "waiting",
      date: todayLabel(),
      title: `[${type}] ${title.trim()}`,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    setTitle("");
    setContent("");
    setAttachments([]);
    setType("마일리지");
    setTab("history");
    setOpenId(newInquiry.id);
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">1:1 문의</h1>
        </div>
        <p className="-mt-3 text-sm text-neutral-400">평균 응답 시간은 영업일 기준 4시간입니다.</p>

        <div className="flex gap-1 rounded-2xl bg-neutral-100 p-1">
          <button
            type="button"
            onClick={() => setTab("history")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              tab === "history" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400"
            }`}
          >
            문의 내역
          </button>
          <button
            type="button"
            onClick={() => setTab("new")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              tab === "new" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400"
            }`}
          >
            새 문의 작성
          </button>
        </div>

        {tab === "history" ? (
          <div className="flex flex-col gap-3">
            {inquiries.length === 0 && (
              <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
                <p className="text-sm font-medium text-neutral-500">아직 문의 내역이 없어요</p>
              </div>
            )}
            {inquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                open={openId === inquiry.id}
                onToggle={() => setOpenId((prev) => (prev === inquiry.id ? null : inquiry.id))}
              />
            ))}
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <p className="mb-2.5 text-sm font-medium text-neutral-900">문의 유형</p>
              <div className="flex flex-wrap gap-2">
                {INQUIRY_TYPES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setType(option)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      type === option
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
              <p className="mb-2 text-sm font-medium text-neutral-900">제목</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="문의 제목을 입력해 주세요"
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-300"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-neutral-900">내용</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="주문번호나 항공편 정보를 함께 적어주시면 더 빠르게 확인할 수 있습니다."
                rows={6}
                className="w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm leading-relaxed text-neutral-900 outline-none placeholder:text-neutral-300"
              />
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={attachments.length >= 3}
                className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 px-4 py-3.5 text-left disabled:opacity-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                  <PlusIcon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <p className="text-sm font-medium text-neutral-900">파일 첨부</p>
                  <p className="text-xs text-neutral-400">영수증 · 화면 캡처 (최대 3개)</p>
                </span>
              </button>
              {attachments.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {attachments.map((name, index) => (
                    <span
                      key={`${name}-${index}`}
                      className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-600"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() =>
                          setAttachments((prev) => prev.filter((_, i) => i !== index))
                        }
                        aria-label={`${name} 첨부 제거`}
                        className="text-neutral-400"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="rounded-full bg-sky-500 py-3.5 text-center text-sm font-bold text-white disabled:opacity-40"
            >
              문의 접수
            </button>
          </form>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
