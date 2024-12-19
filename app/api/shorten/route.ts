import dbConnect from "@/lib/db";
import { Url } from "@/models/Url";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const { longUrl } = await req.json();
  const headersList = await headers();
  const host = headersList.get("host");

  console.log(host);

  console.log(longUrl);

  try {
    await dbConnect();

    const shortCode = nanoid(6);

    const shortUrl = host + "/" + shortCode;

    const newUrl = await Url.create({ longUrl, shortCode });

    return Response.json({ status: 200, shortUrl });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}

//https://www.reddit.com/r/taquerosprogramadores/comments/1hh93xt/github_copilot_free/