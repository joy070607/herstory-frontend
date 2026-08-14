"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/endpoints";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { ROUTES } from "@/constants/routes";

export function LoginPage() {
  const router = useRouter();
  const setMember = useAuthStore((state) => state.setMember);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => authApi.login({ email, name }),
    onSuccess: (member) => {
      setMember(member);
      router.push(ROUTES.hub);
    },
  });

  return (
    <form
      className="flex flex-1 flex-col justify-center gap-6 px-6"
      onSubmit={(e) => {
        e.preventDefault();
        loginMutation.mutate();
      }}
    >
      <h1 className="text-xl font-semibold">HERSTORY</h1>
      <Field
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Field
        id="name"
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {loginMutation.isError && (
        <p className="text-xs text-red-600">로그인에 실패했습니다.</p>
      )}
      <Button type="submit" disabled={loginMutation.isPending}>
        Log in
      </Button>
    </form>
  );
}
