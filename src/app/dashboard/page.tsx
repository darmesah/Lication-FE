"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard/create-application">
        <p className=" bg-white text-black w-fit p-3 mt-4">
          Create new Application
        </p>
      </Link>
    </div>
  );
}
