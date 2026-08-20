import { MyPageCouponDetailPage } from "@/features/preflight/pages/MyPageCouponDetailPage";

export default async function Page({ params }: { params: Promise<{ couponId: string }> }) {
  const { couponId } = await params;
  return <MyPageCouponDetailPage couponId={couponId} />;
}
