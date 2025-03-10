import CollectionDetailPage from "components/ui/screens/CollectionDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CollectionDetailPage slug={slug} />;
}
