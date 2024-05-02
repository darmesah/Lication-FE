"use client";

import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTokenStore } from "@/lib/store/tokenStore";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  stateOfOrigin: Yup.string().required("State of Origin is required"),
  lgaOfOrigin: Yup.string().required("LGA of Origin is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  lga: Yup.string().required("LGA is required"),
  passportNumber: Yup.string().required("Passport Number is required"),
  dateOfIssue: Yup.string().required("Date of Issue is required"),
  dateOfExpiry: Yup.string().required("Date of Expiry is required"),
  placeOfIssue: Yup.string().required("Place of Issue is required"),
  purposeOfTravel: Yup.string().required("Purpose of Travel is required"),
  destinationCountry: Yup.string().required("Destination Country is required"),
  durationOfStay: Yup.string().required("Duration of Stay is required"),
  addressInDestination: Yup.string().required(
    "Address in Destination is required"
  ),
  currentOccupation: Yup.string().required("Current Occupation is required"),
  employerName: Yup.string().required("Employer Name is required"),
  employerAddress: Yup.string().required("Employer Address is required"),
  position: Yup.string().required("Position is required"),
  preferredAppointmentTime: Yup.string().required(
    "Preferred Appointment Time is required"
  ),
  nearestCaptureCenter: Yup.string().required(
    "Nearest Capture Center is required"
  ),
});

export default function CertificateApplication() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const token = useTokenStore((state) => state.token);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string>("");
  const [reqResponseData, setReqResponseData] = useState<any>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    lga: "",
    passportNumber: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    placeOfIssue: "",
    purposeOfTravel: "",
    destinationCountry: "",
    durationOfStay: "",
    addressInDestination: "",
    currentOccupation: "",
    employerName: "",
    employerAddress: "",
    position: "",
    preferredAppointmentTime: "",
    nearestCaptureCenter: "",
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(
        `${apiUrl}/user/create-certificate-application`,
        options
      );

      const responseData: any = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setReqResponseData(responseData.message);
      setResponseError("");
      setIsSubmitting(false);
      setFormSubmitted(true);
    } catch (error: any) {
      setResponseError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex-col bg-white">
      <div className="w-[50%] mx-auto h-full flex flex-col relative justify-between pt-56px">
        <div className="w-[80%] md:w-[60%] m-auto py-20">
          <h1 className="font-semibold text-[2rem] text-center pb-10 text-black">
            Create Application
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-wrap relative h-8 text-left mb-6">
                  <Field
                    as={TextField}
                    label="First Name"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="firstName"
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <br />

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Middle Name"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="middleName"
                  />
                  {errors.middleName && touched.middleName && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.middleName}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Last Name"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="lastName"
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.lastName}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Date of Birth"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="dateOfBirth"
                  />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.dateOfBirth}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="State of Origin"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="stateOfOrigin"
                  />
                  {errors.stateOfOrigin && touched.stateOfOrigin && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.stateOfOrigin}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="LGA of Origin"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="lgaOfOrigin"
                  />
                  {errors.lgaOfOrigin && touched.lgaOfOrigin && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.lgaOfOrigin}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Email"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="email"
                  />
                  {errors.email && touched.email && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Phone"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="phone"
                  />
                  {errors.phone && touched.phone && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Address"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="address"
                  />
                  {errors.address && touched.address && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.address}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="State"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="state"
                  />
                  {errors.state && touched.state && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.state}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="LGA"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="lga"
                  />
                  {errors.lga && touched.lga && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.lga}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Passport Number"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="passportNumber"
                  />
                  {errors.passportNumber && touched.passportNumber && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.passportNumber}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Date of Issue"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="dateOfIssue"
                  />
                  {errors.dateOfIssue && touched.dateOfIssue && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.dateOfIssue}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Date of Expiry"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="dateOfExpiry"
                  />
                  {errors.dateOfExpiry && touched.dateOfExpiry && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.dateOfExpiry}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Place of Issue"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="placeOfIssue"
                  />
                  {errors.placeOfIssue && touched.placeOfIssue && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.placeOfIssue}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Purpose of Travel"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="purposeOfTravel"
                  />
                  {errors.purposeOfTravel && touched.purposeOfTravel && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.purposeOfTravel}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Destination Country"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="destinationCountry"
                  />
                  {errors.destinationCountry && touched.destinationCountry && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.destinationCountry}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Duration of Stay"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="durationOfStay"
                  />
                  {errors.durationOfStay && touched.durationOfStay && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.durationOfStay}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Address in Destination"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="addressInDestination"
                  />
                  {errors.addressInDestination &&
                    touched.addressInDestination && (
                      <div className="absolute bottom-[-36px] text-xs text-red-500">
                        {errors.addressInDestination}
                      </div>
                    )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Current Occupation"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="currentOccupation"
                  />
                  {errors.currentOccupation && touched.currentOccupation && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.currentOccupation}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Employer Name"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="employerName"
                  />
                  {errors.employerName && touched.employerName && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.employerName}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Employer Address"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="employerAddress"
                  />
                  {errors.employerAddress && touched.employerAddress && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.employerAddress}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Position"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="position"
                  />
                  {errors.position && touched.position && (
                    <div className="absolute bottom-[-36px] text-xs text-red-500">
                      {errors.position}
                    </div>
                  )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Preferred Appointment Time"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="preferredAppointmentTime"
                  />
                  {errors.preferredAppointmentTime &&
                    touched.preferredAppointmentTime && (
                      <div className="absolute bottom-[-36px] text-xs text-red-500">
                        {errors.preferredAppointmentTime}
                      </div>
                    )}
                </div>

                <div className="input-wrap relative h-8 text-left mb-12">
                  <Field
                    as={TextField}
                    label="Nearest Capture Center"
                    className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                    name="nearestCaptureCenter"
                  />
                  {errors.nearestCaptureCenter &&
                    touched.nearestCaptureCenter && (
                      <div className="absolute bottom-[-36px] text-xs text-red-500">
                        {errors.nearestCaptureCenter}
                      </div>
                    )}
                </div>

                <div className="flex flex-wrap justify-center">
                  {responseError && (
                    <p className="basis-full text-[0.8rem] text-center pt-5 pb-8 text-red-500">
                      {responseError}
                    </p>
                  )}

                  {reqResponseData && (
                    <p className="basis-full text-[0.8rem] text-center pt-5 pb-8 text-green-500">
                      {reqResponseData}
                    </p>
                  )}

                  <button
                    className={`border bg-[#3023a4] w-[30rem] font-semibold text-white rounded py-2 px-20 ${
                      !isSubmitting && "hover:bg-[#24146B] hover:text-white"
                    } ${isSubmitting && "cursor-not-allowed"}`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? (
                      <span>Create Application</span>
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
        </div>
      </div>
    </div>
  );
}
