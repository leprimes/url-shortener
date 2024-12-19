import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { Url } from "@/models/Url";
import Feedback from "@/components/Feedback";

type Params = Promise<{ shortCode: string }>;

export default async function RedirectPage(props: { params: Params }) {
  const { shortCode } = await props.params;

  console.log(shortCode);

  await dbConnect();

  const urlEntry = await Url.findOne({ shortCode });

  console.log(urlEntry);

  if (!urlEntry) {
    return <Feedback feedback="URL not found." />;
  }

  if (urlEntry.expiresAt < Date.now()) {
    return <Feedback feedback="This link has expired." />;
  } else {
    return redirect(urlEntry.longUrl);
  }
}
