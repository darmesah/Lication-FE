import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import NaptepLogo from "@/assets/naptep.svg";
import Image from "next/image";

const ReviewComponent = ({
  formData,
  onGoBack,
  onSubmit,
  formIsSubmitting,
}: any) => {
  const cleanedFormData = {
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
  };

  return (
    <div className=" text-black">
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 3,
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <div className="flex justify-center mb-6">
          <Image src={NaptepLogo} alt="naptep-logo" />
        </div>
        <Typography variant="h5" gutterBottom>
          Review Your Application
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" gutterBottom>
          ID Number: {cleanedFormData.idNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          First Name: {cleanedFormData.firstName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Middle Name: {cleanedFormData.middleName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Name: {cleanedFormData.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Date of Birth: {cleanedFormData.dateOfBirth}
        </Typography>
        <Typography variant="body1" gutterBottom>
          State of Origin: {cleanedFormData.stateOfOrigin}
        </Typography>
        <Typography variant="body1" gutterBottom>
          LGA of Origin: {cleanedFormData.lgaOfOrigin}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {cleanedFormData.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {cleanedFormData.phone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address: {cleanedFormData.address}
        </Typography>
        <Typography variant="body1" gutterBottom>
          State: {cleanedFormData.state}
        </Typography>
        <Typography variant="body1" gutterBottom>
          LGA: {cleanedFormData.lga}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Passport Number: {cleanedFormData.passportNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Date of Issue: {cleanedFormData.dateOfIssue}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Date of Expiry: {cleanedFormData.dateOfExpiry}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Place of Issue: {cleanedFormData.placeOfIssue}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Purpose of Travel: {cleanedFormData.purposeOfTravel}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Destination Country: {cleanedFormData.destinationCountry}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Duration of Stay: {cleanedFormData.durationOfStay}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address in Destination: {cleanedFormData.addressInDestination}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Current Occupation: {cleanedFormData.currentOccupation}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Employer Name: {cleanedFormData.employerName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Employer Address: {cleanedFormData.employerAddress}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Position: {cleanedFormData.position}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nearest Capture Center: {cleanedFormData.nearestCaptureCenter}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" onClick={onGoBack}>
            Go Back
          </Button>
          <Button
            className={`border bg-[#3023a4] w-[60%] font-semibold text-white rounded ${
              !formIsSubmitting && "hover:bg-[#24146B] hover:text-white"
            } ${formIsSubmitting && "cursor-not-allowed"}`}
            type="button"
            variant="contained"
            onClick={onSubmit}
            disabled={formIsSubmitting}
          >
            {!formIsSubmitting ? (
              <span>Submit Application</span>
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
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ReviewComponent;
