import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { Url } from "@/models/Url";
import Feedback from "@/components/Feedback";

type Params = Promise<{ shortCode: string }>;

export const dynamic = "force-dynamic";

export default async function RedirectPage({ params }: { params: Params }) {
  const { shortCode } = await params;

  if (!shortCode) {
    return <Feedback feedback="Invalid or missing shortcode." />;
  }

  console.log("Shortcode:", shortCode);

  await dbConnect();

  const urlEntry = await Url.findOne({ shortCode });

  console.log(urlEntry);

  if (!urlEntry) {
    return <Feedback feedback="URL not found." />;
  }

  if (urlEntry.expiresAt.getTime() < Date.now()) {
    return <Feedback feedback="This link has expired." />;
  }

  redirect(urlEntry.longUrl);
}
