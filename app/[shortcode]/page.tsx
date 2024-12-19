import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { Url } from "@/models/Url";
import Feedback from "@/components/Feedback";

export default async function RedirectPage({
  params,
}: {
  params: { shortcode: string };
}) {
  const { shortcode } = params;

  await dbConnect();

  const urlEntry = await Url.findOne({ shortCode: shortcode });

  if (!urlEntry) {
    return <Feedback feedback="URL not found." />;
  }

  if (urlEntry.expiresAt < Date.now()) {
    return <Feedback feedback="This link has expired." />;
  } else {
    return redirect(urlEntry.longUrl);
  }
}
