"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/lib/store/tokenStore";

import NaptepLogo from "@/assets/naptep.svg";
import Image from "next/image";

const validationSchema = Yup.object().shape({
  preferredAppointmentTime: Yup.date().required("Please pick a date and time"),
});

const BiometricScheduleForm = ({ params }: any) => {
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = useTokenStore((state) => state.token);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string>("");
  const [reqResponseData, setReqResponseData] = useState<any>(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        preferredAppointmentTime: values.preferredAppointmentTime.toISOString(),
      }),
    };

    try {
      const response = await fetch(
        `${apiUrl}/user/schedule-biometric-appointment/${params?.applicationID}`,
        options
      );

      const responseData: any = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setReqResponseData(true);
      setResponseError("");
      setIsSubmitting(false);
    } catch (error: any) {
      setResponseError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[50%] mt-20 m-auto h-full flex-col bg-white">
      <div className=" mx-auto h-full flex flex-col relative justify-between pt-56px">
        <div className="flex justify-center mb-6">
          <Image src={NaptepLogo} alt="naptep-logo" />
        </div>
        {!reqResponseData ? (
          <div className="w-[80%] md:w-[60%] m-auto py-20">
            <h1 className="font-semibold text-[1.4rem] md:text-[2rem] text-center pb-10 text-black">
              Select Date and Time for Biometric Capture Appointment
            </h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Formik
                initialValues={{
                  preferredAppointmentTime: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }: any) => (
                  <Form>
                    <div className="input-wrap relative h-8 text-left mb-12">
                      <Field name="preferredAppointmentTime">
                        {({ field, form }: any) => (
                          <DateTimePicker
                            {...field}
                            label="Preferred Appointment Time"
                            className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue(field.name, date)
                            }
                          />
                        )}
                      </Field>
                      {errors.preferredAppointmentTime &&
                        touched.preferredAppointmentTime && (
                          <div className="absolute bottom-[-40px] text-xs text-red-500">
                            {errors.preferredAppointmentTime}
                          </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                      <button
                        className={` w-full border bg-[#3023a4] p-3 font-semibold text-white rounded ${
                          !isSubmitting && "hover:bg-[#24146B] hover:text-white"
                        } ${isSubmitting && "cursor-not-allowed"}`}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {!isSubmitting ? (
                          <span>Book Appointment</span>
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
                  </Form>
                )}
              </Formik>
            </LocalizationProvider>
          </div>
        ) : (
          <div className="w-[80%] md:w-[60%] m-auto py-20">
            <div className="flex justify-center">
              <Image src={NaptepLogo} alt="naptep-logo" />
            </div>
            <h1 className="font-semibold text-[1.4rem] text-center pb-10 text-black">
              Biometric Capture Appointment Date Confirmed.
            </h1>
            <div className="flex justify-center">
              <button
                className={`border bg-[#3023a4] w-[60%] p-3 font-semibold text-white rounded `}
              >
                <span
                  onClick={() => {
                    router.replace("/login");
                  }}
                >
                  Exit
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiometricScheduleForm;

// "use client";

// export default function PayApplicationFee({ params }: any) {
//   console.log(params?.applicationID);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="w-[400px] h-[300px] flex flex-col justify-around bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-2xl font-bold mb-4 text-black text-center">
//           Pay Application Fee
//         </h1>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }
