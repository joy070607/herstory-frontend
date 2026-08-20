import { TermsDetailPage } from "@/features/preflight/pages/TermsDetailPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TermsDetailPage slug={slug} />;
}
