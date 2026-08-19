"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import {
  BagIcon,
  BoardingPassIcon,
  CardIcon,
  CareIcon,
  CartIcon,
  CheckCircleIcon,
  ClockIcon,
  GateIcon,
  HangerIcon,
  HomeIcon,
  LockIcon,
  RefreshIcon,
  ScanIcon,
  ShirtIcon,
  SpotIcon,
  StarIcon,
  UserIcon,
} from "@/components/icons";
import type { SVGProps } from "react";

interface MenuItem {
  label: string;
  href?: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  disabled?: boolean;
}

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: "여정",
    items: [
      { label: "홈", href: ROUTES.home, Icon: HomeIcon },
      { label: "보딩패스", href: ROUTES.boardingPass, Icon: BoardingPassIcon },
      { label: "실시간 항공편 카드", href: ROUTES.liveCard, Icon: ClockIcon },
      { label: "여정 타임라인", href: ROUTES.journeyTimeline, Icon: GateIcon },
      { label: "스타일 추천", href: ROUTES.styleEngine, Icon: ShirtIcon },
      { label: "스마트 카트", href: ROUTES.smartCart, Icon: CartIcon },
      { label: "공항 팝업", href: ROUTES.popupSpot, Icon: BagIcon },
    ],
  },
  {
    title: "공항 서비스",
    items: [
      { label: "오토 체크인", href: ROUTES.autoCheckIn, Icon: ScanIcon },
      { label: "VIP 피팅", href: ROUTES.vipFitting, Icon: HangerIcon },
      { label: "패스트 체크아웃", href: ROUTES.fastCheckout, Icon: CheckCircleIcon },
      { label: "재방문 혜택", href: ROUTES.reEntry, Icon: RefreshIcon },
    ],
  },
  {
    title: "마일리지 · 케어",
    items: [
      { label: "마일리지", href: ROUTES.nomadMiles, Icon: StarIcon },
      { label: "가죽 케어 가이드", href: ROUTES.leatherCare, Icon: CareIcon },
      { label: "글로벌 럭셔리 부티크", href: ROUTES.visetosMap, Icon: SpotIcon },
    ],
  },
  {
    title: "계정",
    items: [
      { label: "마이페이지", Icon: UserIcon, disabled: true },
      { label: "회원정보 수정", Icon: UserIcon, disabled: true },
      { label: "비밀번호 재설정", Icon: LockIcon, disabled: true },
      { label: "결제 수단", Icon: CardIcon, disabled: true },
    ],
  },
];

function MenuRow({
  item,
  isActive,
  onNavigate,
}: {
  item: MenuItem;
  isActive: boolean;
  onNavigate: () => void;
}) {
  const { label, href, Icon, disabled } = item;

  const inner = (
    <>
      <Icon className={`h-5 w-5 shrink-0 ${disabled ? "text-neutral-300" : "text-sky-500"}`} />
      <span className={`text-[15px] ${disabled ? "text-neutral-300" : "text-neutral-900"}`}>
        {label}
      </span>
      {disabled && (
        <span className="ml-auto shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-400">
          준비 중
        </span>
      )}
    </>
  );

  if (disabled || !href) {
    return <div className="flex items-center gap-3 px-6 py-3">{inner}</div>;
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-6 py-3 ${isActive ? "bg-sky-50" : ""}`}
    >
      {inner}
    </Link>
  );
}

export function SideMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute inset-y-0 right-0 flex w-[82%] max-w-[340px] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xl font-extrabold tracking-tight text-neutral-900">MENU</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="text-2xl leading-none text-neutral-400"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col pb-8">
          {MENU_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-6 pb-2 pt-4 text-xs font-medium text-neutral-400">{section.title}</p>
              <div className="flex flex-col">
                {section.items.map((item) => (
                  <MenuRow
                    key={item.label}
                    item={item}
                    isActive={Boolean(item.href) && pathname === item.href}
                    onNavigate={onClose}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
