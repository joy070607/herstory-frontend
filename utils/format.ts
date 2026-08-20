export function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMiles(miles: number): string {
  return `${new Intl.NumberFormat("en-US").format(miles)} MILES`;
}

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}min`;
  return `${hours}h ${minutes}min`;
}

export function formatFlightTime(isoDateTime: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(isoDateTime));
}

// recommendationReason 앞에 붙는 "[SILVER VIP AI 큐레이션]" 같은 내부 태그를 제거합니다.
// 템플릿이 등급명 뒤에 항상 리터럴 "VIP"를 붙이기 때문에, VIP 등급 회원에게는
// "[VIP VIP AI 큐레이션]"으로 중복되어 보이는 문제도 함께 해결됩니다.
export function stripAiTagPrefix(text: string): string {
  return text.replace(/^\[[^\]]*\]\s*/, "");
}

export function formatMinutesKorean(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0분";
  if (totalMinutes < 60) return `약 ${totalMinutes}분`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes === 0 ? `약 ${hours}시간` : `약 ${hours}시간 ${minutes}분`;
}
