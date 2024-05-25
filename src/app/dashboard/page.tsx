"use client";

import Link from "next/link";

import NaptepLogo from "@/assets/NatepLogo.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-[100vh] flex-col bg-white">
      <div className="w-[70%]  mx-auto h-full flex flex-col relative justify-between pt-56px">
        <div className="flex justify-center mt-10">
          <Image src={NaptepLogo} alt="naptep-logo" className=" w-[400px]" />
        </div>
        <div className="w-[80%] md:w-[60%] m-auto pb-20">
          <h1 className="font-semibold mt-8 mb-20 text-[2.5rem] text-center text-green-900">
            Foreign Employment Biometric Certificate Application
          </h1>
          <div className=" flex justify-center mt-9">
            <Link href="/dashboard/create-application">
              <button
                className={`border bg-[#3023a4] w-[30rem] font-semibold text-white rounded py-4 px-20 `}
                type="button"
              >
                <span>Start Application</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
