"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl }),
    });

    const data = await response.json();
    console.log(data);
    setLongUrl("");

    if (response.ok) {
      setShortUrl(data.shortUrl);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center">
          <Image src="/hootie-logo.png" alt="logo" width={200} height={50} />
          <h1 className="text-5xl font-bold"> URL Shortener</h1>
        </div>
        <div className="w-full max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="url"
              placeholder="URL"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full"
              required
            />
            <Button type="submit">Shorten!</Button>
          </form>
          {shortUrl && (
            <div className="mt-5">
              <p>{shortUrl}</p>
              <Button
                className=""
                onClick={handleCopy}
                variant={"outline"}
                size="sm"
                disabled={copied}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="italic text-sm text-slate-400">
          *Links expire after 24 hours.
        </p>
      </footer>
    </div>
  );
}
