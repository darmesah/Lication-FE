"use client";

import React, { useState } from "react";
import CreateCertificateApplicationForm from "./components/CreateApplicationForm";
import ReviewComponent from "./components/ReviewApplication";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/lib/store/tokenStore";

const ParentComponent = () => {
  const [formData, setFormData] = useState<any>({});
  const [showReview, setShowReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string>("");
  const [reqResponseData, setReqResponseData] = useState<any>("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const token = useTokenStore((state) => state.token);

  const handleSubmit = (values: any) => {
    setFormData(values);
    setShowReview(true);
  };

  const handleGoBack = () => {
    setShowReview(false);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        dateOfBirth: new Date(
          formData.dateOfBirth.toISOString()
        ).toLocaleDateString(),
        dateOfIssue: new Date(
          formData.dateOfIssue.toISOString()
        ).toLocaleDateString(),
        dateOfExpiry: new Date(
          formData.dateOfExpiry.toISOString()
        ).toLocaleDateString(),
      }),
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

      router.push(
        `/dashboard/pay-application-fee/${responseData.newCertificate._id}`
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
    <div>
      {!showReview ? (
        <CreateCertificateApplicationForm
          inputedValues={formData}
          onSubmit={handleSubmit}
        />
      ) : (
        <ReviewComponent
          formData={formData}
          onGoBack={handleGoBack}
          onSubmit={handleFinalSubmit}
          formIsSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default ParentComponent;
