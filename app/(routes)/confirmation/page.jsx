import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <article className="flex flex-col items-center justify-center gap-5 p-20">
      <CheckCircle className="h-9 w-9 text-green-500" />
      <h2 className="font-bold text-3xl">Your Meeting is scheduled</h2>
      <h2 className="text-lg text-gray-500">Confirmation Sent</h2>
      <Link href={"/dashboard"}>
        <Button>Thank you</Button>
      </Link>
    </article>
  );
}

export default page;
