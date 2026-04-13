import { notFound } from "next/navigation";
import { ApiDetail } from "@/components/docs/api-detail";
import { apiEndpoints, getEndpointBySlug } from "@/data/docs-apis";

export function generateStaticParams() {
  return apiEndpoints.map((endpoint) => ({ slug: endpoint.slug }));
}

export default async function EndpointPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const endpoint = getEndpointBySlug(slug);

  if (!endpoint) notFound();

  return <ApiDetail endpoint={endpoint} />;
}
