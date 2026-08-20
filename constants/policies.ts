// api연동 전 하드코딩 목업 데이터입니다.

export const MARKETING_CONSENT_SLUG = "marketing-consent";
export const THIRD_PARTY_SHARING_SLUG = "third-party-sharing";

export type PolicyBadge = "필수" | "선택";

export interface PolicySection {
  heading: string;
  body: string;
}

interface PolicyBase {
  slug: string;
  title: string;
  badge: PolicyBadge;
  listSubtitle: string;
  metaLabel: string;
  metaValue: string;
  sections: PolicySection[];
}

export interface InfoPolicy extends PolicyBase {
  type: "info";
}

export interface ConsentPolicy extends PolicyBase {
  type: "consent";
}

export type Policy = InfoPolicy | ConsentPolicy;

export const POLICIES: Policy[] = [
  {
    slug: "terms-of-service",
    type: "info",
    title: "서비스 이용약관",
    badge: "필수",
    listSubtitle: "2026.03.01 개정",
    metaLabel: "시행일",
    metaValue: "2026.03.01 개정",
    sections: [
      {
        heading: "제1조 (목적)",
        body: '본 약관은 HER-STORY(이하 "회사")가 제공하는 여행 · 면세 커머스 서비스의 이용 조건과 절차, 회원과 회사의 권리 · 의무 및 책임사항을 규정함을 목적으로 합니다.',
      },
      {
        heading: "제2조 (회원 가입)",
        body: "회원 가입은 본인 명의의 휴대전화 인증 또는 이메일 인증을 통해 완료되며, 만 14세 미만은 가입할 수 없습니다. 타인의 정보를 도용한 경우 이용이 제한될 수 있습니다.",
      },
      {
        heading: "제3조 (마일리지)",
        body: "마일리지는 면세 구매 · 항공편 등록 등 회사가 정한 기준에 따라 적립되며, 적립일로부터 5년간 유효합니다. 부정한 방법으로 적립된 마일리지는 회수될 수 있습니다.",
      },
      {
        heading: "제4조 (서비스의 변경 및 중단)",
        body: "회사는 운영상 · 기술상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있으며, 중대한 변경은 시행 30일 전에 공지합니다.",
      },
      {
        heading: "제5조 (계약 해지)",
        body: "회원은 언제든지 앱 내 회원 탈퇴를 통해 이용계약을 해지할 수 있습니다. 해지 시 보유 마일리지와 쿠폰은 즉시 소멸됩니다.",
      },
    ],
  },
  {
    slug: "privacy-policy",
    type: "info",
    title: "개인정보 처리방침",
    badge: "필수",
    listSubtitle: "2026.03.01 개정",
    metaLabel: "시행일",
    metaValue: "2026.03.01 개정",
    sections: [
      {
        heading: "1. 수집하는 개인정보 항목",
        body: "필수 — 이름, 생년월일, 휴대전화 번호, 이메일, 여권 영문 성명 및 번호. 선택 — 프로필 사진, 마케팅 수신 여부.",
      },
      {
        heading: "2. 수집 및 이용 목적",
        body: "회원 식별과 본인 확인, 면세 구매 자격 확인, 여정 정보 제공, 마일리지 적립 · 사용 관리, 고객 문의 응대에 이용합니다.",
      },
      {
        heading: "3. 보유 및 이용 기간",
        body: "회원 탈퇴 시 지체 없이 파기합니다. 다만 전자상거래법 등 관계 법령에 따라 거래 기록은 5년간 보관합니다.",
      },
      {
        heading: "4. 파기 절차 및 방법",
        body: "전자적 파일은 복구 불가능한 방법으로 삭제하고, 출력물은 분쇄하거나 소각합니다.",
      },
      {
        heading: "5. 이용자의 권리",
        body: "회원은 언제든지 개인정보 열람 · 정정 · 삭제 · 처리정지를 요구할 수 있으며, 마이페이지 또는 고객센터를 통해 신청할 수 있습니다.",
      },
    ],
  },
  {
    slug: "location-service",
    type: "info",
    title: "위치기반 서비스 약관",
    badge: "선택",
    listSubtitle: "2025.11.10 개정",
    metaLabel: "시행일",
    metaValue: "2025.11.10 개정",
    sections: [
      {
        heading: "1. 위치정보 이용 목적",
        body: "공항 내 부티크 안내, 근처 매장 찾기, 게이트 기준 인도장 안내에 이용합니다.",
      },
      {
        heading: "2. 수집 방법",
        body: "단말기의 GPS 및 Wi-Fi 기반 위치정보를 이용하며, 앱 실행 중에만 수집합니다.",
      },
      {
        heading: "3. 보유 기간",
        body: "위치정보는 서비스 제공 즉시 처리되며 별도로 저장하지 않습니다. 다만 위치정보 이용 · 제공 사실 확인자료는 6개월간 보관합니다.",
      },
      {
        heading: "4. 동의 철회",
        body: "기기의 설정 > 앱 권한에서 위치 권한을 해제하면 즉시 철회됩니다. 철회 시 매장 찾기 등 일부 기능이 제한됩니다.",
      },
    ],
  },
  {
    slug: MARKETING_CONSENT_SLUG,
    type: "consent",
    title: "마케팅 정보 수신 동의",
    badge: "선택",
    listSubtitle: "동의 · 2026.01.04",
    metaLabel: "동의일",
    metaValue: "2026.01.04",
    sections: [
      {
        heading: "1. 수신 항목",
        body: "신규 팝업 스토어 소식, 시즌 프로모션, 마일리지 적립 이벤트, 등급별 혜택 안내.",
      },
      {
        heading: "2. 발송 수단",
        body: "앱 푸시 알림, 이메일, 문자메시지(LMS).",
      },
      {
        heading: "3. 철회 방법",
        body: "본 화면의 토글 또는 마이페이지 > 알림 설정에서 언제든지 철회할 수 있습니다. 철회하더라도 여정 변경, 마일리지 소멸 예정 등 필수 안내는 계속 발송됩니다.",
      },
    ],
  },
  {
    slug: THIRD_PARTY_SHARING_SLUG,
    type: "consent",
    title: "제3자 정보 제공 동의",
    badge: "필수",
    listSubtitle: "면세점 · 항공사",
    metaLabel: "제공받는 자",
    metaValue: "면세점 · 항공사",
    sections: [
      {
        heading: "1. 제공받는 자",
        body: "인천국제공항 면세 사업자, 제휴 항공사(대한항공 · 아시아나항공), 결제대행사(PG).",
      },
      {
        heading: "2. 제공 항목",
        body: "이름, 여권 영문 성명 및 번호, 항공편 정보, 구매 내역.",
      },
      {
        heading: "3. 제공 목적",
        body: "면세 구매 자격 확인 및 인도장 수령 처리, 탑승객 정보 대조, 결제 승인 및 정산.",
      },
      {
        heading: "4. 보유 기간",
        body: "제공 목적 달성 시까지. 단 관세법 등 관계 법령에 따라 필요한 경우 해당 기간 동안 보관합니다.",
      },
      {
        heading: "5. 동의 거부 권리",
        body: "동의를 거부할 수 있으나, 이 경우 면세 구매 및 인도장 수령 서비스 이용이 제한됩니다.",
      },
    ],
  },
];

export function getPolicyBySlug(slug: string): Policy | undefined {
  return POLICIES.find((policy) => policy.slug === slug);
}
