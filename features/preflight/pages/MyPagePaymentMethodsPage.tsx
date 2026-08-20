"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { Toggle } from "@/components/ui/Toggle";
import { useAuthStore } from "@/store/authStore";
import {
  useAddPaymentMethod,
  useDeletePaymentMethod,
  usePaymentMethods,
} from "@/hooks/queries";
import { WakingScreen } from "@/components/system/WakingScreen";
import { ErrorState } from "@/components/system/ErrorState";
import { PaymentMethodsIcon } from "@/components/icons";
import type { PaymentMethodItem } from "@/types/api.types";

function CardRow({
  card,
  confirming,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  deleting,
}: {
  card: PaymentMethodItem;
  confirming: boolean;
  onRequestDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  deleting: boolean;
}) {
  if (confirming) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-900">{card.cardName} 삭제할까요?</p>
          <p className="mt-0.5 text-xs text-neutral-400">등록된 결제 수단에서 삭제됩니다.</p>
        </div>
        <button
          type="button"
          onClick={onCancelDelete}
          disabled={deleting}
          className="shrink-0 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-500 disabled:opacity-40"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirmDelete}
          disabled={deleting}
          className="shrink-0 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
        >
          {deleting ? "삭제 중..." : "삭제"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
        <PaymentMethodsIcon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-neutral-900">{card.cardName}</p>
          {card.isDefault && (
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium text-sky-700">
              기본
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-neutral-400">{card.subtitle || card.cardNumberMasked}</p>
      </div>
      <button
        type="button"
        onClick={onRequestDelete}
        className="shrink-0 text-xs font-medium text-red-500 underline"
      >
        삭제
      </button>
    </div>
  );
}

export function MyPagePaymentMethodsPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const { data: cards, isLoading, isError, refetch } = usePaymentMethods(memberId);
  const addCardMutation = useAddPaymentMethod(memberId);
  const deleteCardMutation = useDeletePaymentMethod(memberId);

  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleConfirmDelete = (cardId: number) => {
    setDeletingId(cardId);
    deleteCardMutation.mutate(cardId, {
      onSettled: () => {
        setDeletingId(null);
        setConfirmingId(null);
      },
    });
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cardName.trim() || !cardNumber.trim()) return;
    addCardMutation.mutate(
      { cardName: cardName.trim(), cardNumber: cardNumber.trim(), isDefault },
      {
        onSuccess: () => {
          setCardName("");
          setCardNumber("");
          setIsDefault(false);
          setShowForm(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">결제 수단</h1>
        </div>
        <p className="-mt-3 text-sm text-neutral-400">
          면세 결제 및 빠른 체크아웃에 사용되는 등록 카드예요.
        </p>

        {isLoading && <WakingScreen />}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {cards && cards.length === 0 && (
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-center">
            <p className="text-sm font-medium text-neutral-500">등록된 결제 수단이 없어요</p>
          </div>
        )}

        {cards && cards.length > 0 && (
          <div className="flex flex-col gap-3">
            {cards.map((card) => (
              <CardRow
                key={card.cardId}
                card={card}
                confirming={confirmingId === card.cardId}
                onRequestDelete={() => setConfirmingId(card.cardId)}
                onCancelDelete={() => setConfirmingId(null)}
                onConfirmDelete={() => handleConfirmDelete(card.cardId)}
                deleting={deletingId === card.cardId}
              />
            ))}
          </div>
        )}

        {!showForm ? (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-full border-2 border-dashed border-neutral-200 py-3.5 text-center text-sm font-medium text-sky-600"
          >
            + 새 카드 등록
          </button>
        ) : (
          <form className="flex flex-col gap-4 rounded-2xl bg-neutral-50 p-4" onSubmit={handleAdd}>
            <div>
              <p className="mb-1.5 text-sm text-neutral-900">카드 이름</p>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="예: VISA 신한카드"
                className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-300"
              />
            </div>
            <div>
              <p className="mb-1.5 text-sm text-neutral-900">카드 번호</p>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="•••• •••• •••• 1234"
                className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-900">기본 카드로 설정</span>
              <Toggle checked={isDefault} onChange={setIsDefault} label="기본 카드로 설정" />
            </div>
            {addCardMutation.isError && (
              <p className="text-xs text-red-600">카드 등록에 실패했습니다.</p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-full border border-neutral-300 py-3 text-sm font-medium text-neutral-500"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!cardName.trim() || !cardNumber.trim() || addCardMutation.isPending}
                className="flex-1 rounded-full bg-sky-500 py-3 text-sm font-bold text-white disabled:opacity-40"
              >
                {addCardMutation.isPending ? "등록 중..." : "등록"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
