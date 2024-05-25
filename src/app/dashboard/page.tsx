"use client";

import Link from "next/link";

import NaptepLogo from "@/assets/NatepLogo.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <Image src={NaptepLogo} alt="naptep-logo" className=" w-[400px]" />
      </div>
      <Link href="/dashboard/create-application">
        <p className=" bg-white text-black w-fit p-3 mt-4">
          Create new Application
        </p>
      </Link>
    </div>
  );
}
