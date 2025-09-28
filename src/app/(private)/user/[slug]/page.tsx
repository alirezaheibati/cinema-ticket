import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { slug: string };
}) {
  const awaitedParams = await params;
  const validSlugs = [
    "bookings",
    "checkout",
    "dashboard",
    "movies",
    "show",
    "success",
    "wallet",
  ];

  if (!validSlugs.includes(awaitedParams.slug)) {
    notFound();
  }

  return <div>{awaitedParams.slug} page</div>;
}
