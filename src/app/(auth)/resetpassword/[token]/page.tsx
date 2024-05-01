"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InnoX from "@/assets/pitch-to-win/icon.png";
import { FaRegCopyright } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "s must match")
    .required("Please confirm your password"),
});

export default function SolverForm({ params }: any) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string>("");
  const [reqResponseData, setReqResponseData] = useState<any>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(
        `https://api.innox.africa/api/v1/auth/passwordreset/${params.token}`,
        // "https://api.innox.africa/api/v1/auth/register",
        options
      );

      const responseData: any = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      setReqResponseData("Password reset successfully");

      setResponseError("");
      setIsSubmitting(false);
      setFormSubmitted(true);
    } catch (error: any) {
      setResponseError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white  w-full flex-col  h-full flex  relative  pt-56px">
      <div className="flex flex-col md:flex-row justify-between px-10">
        <div className="flex flex-col w-full md:w-6/12">
          <div className="pt-20">
            <div className="pt-3 px-7 leading-tight flex flex-col">
              <h1 className="md:text-2xl text-xl font-bold ">
                Set New Password
              </h1>
              {reqResponseData && (
                <p>
                  {reqResponseData}{" "}
                  <Link className=" text-red-400" href="/login">
                    Click to login
                  </Link>
                </p>
              )}
              <div className="flex flex-col justify-between gap-10 w-10/12">
                <div className="flex flex-col"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-6/12">
          <div className="border rounded-lg shadow-md bg-white box-border my-12">
            <div className="py-14 px-6 md:px-12 box-border">
              <div>
                <div className="px-5 pb-5">
                  <div className="font-semibold text-lg xl:text-lg text-left pb-6">
                    <span className="">Input your new password</span>
                  </div>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="w-full h-full">
                      <div className="input-wrap relative h-[2.5rem] md:h-8 text-left mb-12">
                        <Field
                          as={TextField}
                          label="Password"
                          className="border-0 border-b mb-10 input-field absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                          name="password"
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-[50%] transform -translate-y-1/2 mr-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && touched.password && (
                          <div className="relative top-[-2px] pb-2 md:top-[40px] md:absolute pt-2.5 md:bottom-[-42px] bottom-[-60px] text-xs text-red-500">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="input-wrap relative h-8 text-left mb-20">
                        <Field
                          as={TextField}
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className="border-0 border-b pt-1 input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-[50%] transform -translate-y-1/2 mr-2"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="absolute pt-1 top-[56px] bottom-[-62px] pb-2 text-xs text-red-500">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap justify-center">
                        {responseError && (
                          <p className="basis-full text-[0.8rem] text-center py-5 text-red-500">
                            {responseError}
                          </p>
                        )}
                        <button
                          className={`border bg-[#3023a4] w-[30rem] font-semibold text-white rounded py-2 px-20 ${
                            !isSubmitting &&
                            "hover:bg-[#24146B] hover:text-white"
                          } ${isSubmitting && "cursor-not-allowed"}`}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {!isSubmitting ? (
                            <span>Submit</span>
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
                <div className="flex mb-10 grow shrink"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
