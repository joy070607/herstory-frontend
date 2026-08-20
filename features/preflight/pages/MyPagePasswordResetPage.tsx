"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AiHotBar } from "@/components/layout/AiHotBar";
import { BackButton } from "@/components/layout/BackButton";
import { useAuthStore } from "@/store/authStore";
import { useChangePassword } from "@/hooks/queries";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/components/icons";

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggleVisible,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-neutral-900">{label}</p>
      <div className="flex items-center gap-2.5 border-b border-black/30 pb-1.5">
        <LockIcon className="text-neutral-400" />
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="w-full text-lg text-neutral-900 outline-none"
        />
        <button
          type="button"
          onClick={onToggleVisible}
          className="shrink-0 text-neutral-300"
          aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

export function MyPagePasswordResetPage() {
  const member = useAuthStore((state) => state.member);
  const memberId = member ? Number(member.id) : null;
  const changePasswordMutation = useChangePassword(memberId);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-bold text-neutral-900">비밀번호 재설정</h1>
        </div>
        <p className="-mt-4 text-sm text-neutral-400">
          현재 비밀번호 확인 후 새로운 비밀번호로 변경할 수 있어요.
        </p>

        <form
          className="flex flex-col gap-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (newPassword !== newPasswordConfirm) {
              setMismatch(true);
              return;
            }
            setMismatch(false);
            changePasswordMutation.mutate(
              { currentPassword, newPassword },
              {
                onSuccess: () => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setNewPasswordConfirm("");
                },
              }
            );
          }}
        >
          <PasswordField
            label="현재 비밀번호"
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrent}
            onToggleVisible={() => setShowCurrent((prev) => !prev)}
          />
          <PasswordField
            label="새 비밀번호"
            value={newPassword}
            onChange={(value) => {
              setNewPassword(value);
              setMismatch(false);
              changePasswordMutation.reset();
            }}
            visible={showNew}
            onToggleVisible={() => setShowNew((prev) => !prev)}
          />
          <PasswordField
            label="새 비밀번호 확인"
            value={newPasswordConfirm}
            onChange={(value) => {
              setNewPasswordConfirm(value);
              setMismatch(false);
              changePasswordMutation.reset();
            }}
            visible={showNew}
            onToggleVisible={() => setShowNew((prev) => !prev)}
          />

          {mismatch && <p className="text-xs text-red-600">새 비밀번호가 일치하지 않습니다.</p>}
          {changePasswordMutation.isSuccess && changePasswordMutation.data.success && (
            <p className="text-center text-sm font-medium text-sky-600">
              {changePasswordMutation.data.message || "비밀번호가 변경되었습니다."}
            </p>
          )}
          {changePasswordMutation.isSuccess && !changePasswordMutation.data.success && (
            <p className="text-center text-sm font-medium text-red-600">
              {changePasswordMutation.data.message || "비밀번호 변경에 실패했습니다."}
            </p>
          )}
          {changePasswordMutation.isError && (
            <p className="text-center text-sm font-medium text-red-600">
              비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해 주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="rounded-[25px] bg-sky-500 py-3.5 text-center text-lg font-bold text-[#E6F7FF] disabled:opacity-40"
          >
            {changePasswordMutation.isPending ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      </div>

      <div className="mt-auto">
        <AiHotBar />
      </div>
    </div>
  );
}
