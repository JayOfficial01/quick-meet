"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

function Hero() {
  return (
    <article className="flex flex-col justify-center items-center h-screen">
      <article className="hidden md:block">
        <Image
          src="/image.jpg"
          width={200}
          height={200}
          className="rounded-full w-[120px] h-[120px] absolute top-[120px] right-20"
        />
        <Image
          src="/image2.jpg"
          width={200}
          height={200}
          className="rounded-full w-[120px] h-[120px] absolute top-[150px] left-20"
        />
        <Image
          src="/image3.jpg"
          width={200}
          height={200}
          className="rounded-full w-[120px] h-[120px] absolute bottom-[200px] left-[250px]"
        />

        <Image
          src="/image4.jpg"
          width={200}
          height={200}
          className="rounded-full w-[120px] h-[120px] absolute bottom-[200px] right-[250px]"
        />
      </article>

      <h2 className="font-bold text-[30px] md:text-[50px] text-slate-700 text-center">
        Effortless Scheduling, Productive Meetings
      </h2>
      <p className="text-center text-md md:text-xl text-slate-500">
        Welcome to Quick Meet! Effortlessly plan and manage your meetings in
        just a few taps
      </p>

      <article className="flex gap-4 flex-col mt-5 text-center ">
        <h3>Sign Up free with google and facebook</h3>

        <article className="flex items-center justify-center gap-8">
          <RegisterLink>
            <Button
              variant="outline"
              className="border-primary text-primary flex items-center gap-2 p-6"
            >
              <Image
                src="/google.png"
                alt="google icon"
                width={20}
                height={20}
              />
              Sign up with Google
            </Button>
          </RegisterLink>
          <RegisterLink>
            <Button
              variant="outline"
              className="border-primary text-primary flex items-center gap-2 p-6"
            >
              <Image
                src="/facebook.png"
                alt="google icon"
                width={20}
                height={20}
              />
              Sign up with Facebook
            </Button>
          </RegisterLink>
        </article>

        <hr />
        <h2>
          <Link href="" className="text-primary">
            {" "}
            Sign up Free with Email
          </Link>{" "}
          no credit card required
        </h2>
      </article>
    </article>
  );
}

export default Hero;
