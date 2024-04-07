import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const MainContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "10px",
  alignItems: "center",
  margin: "10px 10px 0px 20px",
  borderRadius: "20px", 

  [theme.breakpoints.down("sm")]: {
    margin: "50px 20px 0px 20px",
  },
}));

const LeftColumn = styled(Grid)(({ theme }) => ({
  padding: "20px",
  maxWidth: "400px",
  margin: "10px",
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  cursor: "pointer",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "350px",
  },
  "&:hover": {
    transform: "scale(1.05)", 
    transition: "transform 0.2s ease-in-out", 
  },
}));

const GuidelinesComponent = () => {
  return (
    <LeftColumn item>
      <Typography variant="h5" gutterBottom style={{ color: "#333" }}>
        Getting Started
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            Copy the <strong>WebHook URL</strong> & <strong>Verify Token</strong>{" "}
            and Verify your WhatsApp Business account and update your account details
            accordingly.
          </Typography>
        </li>
       
        <li>
          <Typography variant="body1">
            Add mobile numbers in the <strong>international format (ex: +94***) </strong> to enable
            communication via WhatsApp.
          </Typography>
        </li>
      </ol>
    </LeftColumn>
  );
};

const AboutComponent = () => {
  return (
    <LeftColumn item>
      <Typography variant="h5" gutterBottom style={{ color: "#333" }}>
        About Us
      </Typography>
      <Typography variant="body1">
        This platform empowers you to tailor your integration to suit your
        specific needs.
        <br />
        <br />
        You want to set up essential configurations, ensuring smooth operation
        of your WhatsApp integration. Verify your account and maintain control
        over your user database by uploading and managing mobile numbers and
        related data.
      </Typography>
    </LeftColumn>
  );
};

const GuideComponent = () => {
  return (
    <MainContentWrapper data-aos="fade-up">
        <GuidelinesComponent />
        <AboutComponent />
    </MainContentWrapper>
  );
};

export default GuideComponent;
