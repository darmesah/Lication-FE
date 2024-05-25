import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import NaptepLogo from "@/assets/naptep.svg";
import Image from "next/image";

const initialValues = {
  idNumber: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: null,
  stateOfOrigin: "",
  lgaOfOrigin: "",
  email: "",
  phone: "",
  address: "",
  state: "",
  lga: "",
  passportNumber: "",
  dateOfIssue: null,
  dateOfExpiry: null,
  placeOfIssue: "",
  purposeOfTravel: "",
  destinationCountry: "",
  durationOfStay: "",
  addressInDestination: "",
  currentOccupation: "",
  employerName: "",
  employerAddress: "",
  position: "",
  // preferredAppointmentTime: null,
  nearestCaptureCenter: "",
};

const validationSchema = Yup.object().shape({
  idNumber: Yup.string().required("ID Number is required"),
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
  // preferredAppointmentTime: Yup.date().required(
  //   "Preferred Appointment Time is required"
  // ),
  nearestCaptureCenter: Yup.string().required(
    "Nearest Capture Center is required"
  ),
});

const CreateCertificateApplicationForm = ({ inputedValues, onSubmit }: any) => {
  return (
    <div className="w-full h-full flex-col bg-white">
      <div className="md:w-[70%] mx-auto h-full flex flex-col relative justify-between pt-56px">
        <div className="w-[80%] md:w-[60%] m-auto py-20">
          <div className="flex justify-center mb-6">
            <Image src={NaptepLogo} alt="naptep-logo" />
          </div>
          <h1 className="font-semibold text-[1.6rem] md:text-[1.5rem] text-center pb-10 text-black">
            Start Application for Foreign Employment Biometric Certificate
          </h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
              initialValues={
                !inputedValues.firstName ? initialValues : inputedValues
              }
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }: any) => (
                <Form className=" md:w-[70%] m-auto">
                  <div className="input-wrap relative h-8 text-left mb-6">
                    <Field
                      as={TextField}
                      label="ID Number"
                      className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                      name="idNumber"
                      placeholder="Enter your NIN"
                    />
                    {errors.idNumber && touched.idNumber && (
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
                        {errors.idNumber}
                      </div>
                    )}
                  </div>
                  <br />
                  <div className="input-wrap relative h-8 text-left mb-12">
                    <Field
                      as={TextField}
                      label="First Name"
                      className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                      name="firstName"
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="input-wrap relative h-8 text-left mb-12">
                    <Field
                      as={TextField}
                      label="Middle Name"
                      className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                      name="middleName"
                    />
                    {errors.middleName && touched.middleName && (
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className="input-wrap relative h-8 text-left mb-12">
                    <Field name="dateOfBirth">
                      {({ field, form }: any) => (
                        <DatePicker
                          {...field}
                          label="Date of Birth"
                          className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                        />
                      )}
                    </Field>
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
                        {errors.passportNumber}
                      </div>
                    )}
                  </div>
                  <div className="input-wrap relative h-8 text-left mb-12">
                    <Field name="dateOfIssue">
                      {({ field, form }: any) => (
                        <DatePicker
                          {...field}
                          label="Date of Issue"
                          className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                        />
                      )}
                    </Field>
                    {errors.dateOfIssue && touched.dateOfIssue && (
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
                        {errors.dateOfIssue}
                      </div>
                    )}
                  </div>
                  <div className="input-wrap relative h-8 text-left mb-12">
                    <Field name="dateOfExpiry">
                      {({ field, form }: any) => (
                        <DatePicker
                          {...field}
                          label="Date of Expiry"
                          className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                        />
                      )}
                    </Field>
                    {errors.dateOfExpiry && touched.dateOfExpiry && (
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                    {errors.destinationCountry &&
                      touched.destinationCountry && (
                        <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                        <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
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
                      <div className="absolute bottom-[-40px] text-xs text-red-500">
                        {errors.position}
                      </div>
                    )}
                  </div>
                  <div className="input-wrap relative h-8 text-left mb-12">
                    <Field
                      as={TextField}
                      select
                      label="Nearest Capture Center"
                      className="border-0 border-b input-field mb-10 absolute outline-0 p-0 w-full h-full bg-white text-sm duration-75"
                      name="nearestCaptureCenter"
                    >
                      <MenuItem value="" disabled>
                        Select a capture center
                      </MenuItem>
                      <MenuItem value="Abuja">Abuja</MenuItem>
                      <MenuItem value="Lagos">Lagos</MenuItem>
                      <MenuItem value="Port Harcourt">Port Harcourt</MenuItem>
                      <MenuItem value="Kaduna">Kaduna</MenuItem>
                    </Field>
                    {errors.nearestCaptureCenter &&
                      touched.nearestCaptureCenter && (
                        <div className="absolute bottom-[-40px] text-xs text-red-500">
                          {errors.nearestCaptureCenter}
                        </div>
                      )}
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <button
                      className={`border bg-[#3023a4] w-[30rem] font-semibold text-white rounded py-2 px-10 `}
                      type="submit"
                    >
                      <span>Review Application</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificateApplicationForm;
