"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/lib/store/tokenStore";
import NaptepLogo from "@/assets/NatepLogo.jpg";
import Image from "next/image";

export default function PayApplicationFee({ params }: any) {
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = useTokenStore((state) => state.token);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string>("");
  const [reqResponseData, setReqResponseData] = useState<any>("");

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${apiUrl}/user/pay-for-certificate-application/${params?.applicationID}`,
        options
      );

      const responseData: any = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      router.push(
        `/dashboard/pick-biometric-schedule/${params?.applicationID}`
      );

      setReqResponseData(responseData.message);
      setResponseError("");
      setIsSubmitting(false);
    } catch (error: any) {
      setResponseError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[90%] md:w-[60%] h-700px] flex flex-col justify-around bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Image src={NaptepLogo} alt="naptep-logo" className=" w-[300px]" />
        </div>
        <h1 className="font-semibold mt-5 text-[2.4rem] text-center text-green-900 mb-7">
          Foreign Employment Biometric Certificate Application
        </h1>
        <h1 className="text-2xl font-bold mb-4 text-black text-center">
          Pay Application Fee
        </h1>
        <div className="flex justify-center">
          <button
            className={`border bg-[#3023a4] w-[60%] p-3 font-semibold text-white rounded ${
              !isSubmitting && "hover:bg-[#24146B] hover:text-white"
            } ${isSubmitting && "cursor-not-allowed"}`}
            type="button"
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
          >
            {!isSubmitting ? (
              <span>Confirm Payment</span>
            ) : (
              <span className="flex justify-center px-10">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 animate-spin dark:text-[#24146B] fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
