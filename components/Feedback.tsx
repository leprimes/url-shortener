import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const Feedback = ({ feedback }: { feedback: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <p className="text-center text-gray-700">{feedback}</p>
      <p className="mt-5">
        <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
          Ok
        </Link>
      </p>
    </div>
  );
};

export default Feedback;
