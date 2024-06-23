"use client";

import React, { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import Logo from "@/app/_components/Logo";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const onCreateBusiness = async () => {
    setLoading(true);

    await setDoc(doc(db, "Business", user.email), {
      businessName: businessName,
      email: user.email,
      userName: user.given_name + " " + user.family_name,
    }).then(() => {
      setLoading(false);
      router.push("/dashboard");
    });
  };

  return (
    <article className="p-14 flex items-center flex-col gap-20 my-10">
      <Logo />
      <article className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business?
        </h2>
        <p className="text-slate-500 ">
          You can always change this later from settings
        </p>

        <article className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="Ex. Goat"
            className="mt-2 outline-none"
            onChange={(e) => setBusinessName(e.target.value)}
            value={businessName}
          />
        </article>

        <Button
          className="w-full"
          disabled={!businessName || loading}
          onClick={onCreateBusiness}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Business
        </Button>
      </article>
    </article>
  );
}

export default CreateBusiness;
