import React from "react";
import styled from "styled-components";
import { Typography, Grid } from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 50px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeading = styled(Typography)`
  color: #fff;
  margin-bottom: 20px !important;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div>
              <SectionHeading variant="h6">Contact Information</SectionHeading>
              <Typography variant="body1">Email: contact@yourcompany.com</Typography>
              <Typography variant="body1">Phone: +123 456 7890</Typography>
              <Typography variant="body1">Address: 123 Street Name, City, Country</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>
              <SectionHeading variant="h6">Company Info</SectionHeading>
              <Typography variant="body1">About Us</Typography>
              <Typography variant="body1">Careers</Typography>
              <Typography variant="body1">Terms of Service</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>
              <SectionHeading variant="h6">Connect with Us</SectionHeading>
              <IconWrapper>
                <Facebook />
                <Twitter />
                <LinkedIn />
              </IconWrapper>
            </div>
          </Grid>
        </Grid>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
