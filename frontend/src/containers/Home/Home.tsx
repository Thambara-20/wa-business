import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Paths } from "../../App";
import AOS from "aos";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <Container
      data-aos="fade-up"
      style={{
        backdropFilter: "blur(30px)",
        border: "1px #000",
        padding: "35px",
        margin: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        boxShadow: "5px 5px 15px -5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{ marginTop: "10px", textAlign: "center" }}
      >
        Welcome to Whatsapp Business Connector
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ textAlign: "center" }}
      >
        Your go-to platform for managing your Organization via whatsapp
        business!
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ marginTop: "50px" }}
      >
        <Grid item xs={12} md={6}>
          <Card
            style={{ marginTop: "20px", borderRadius: "20px", padding: "15px" }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Manage Message Template
              </Typography>
              <Typography variant="body1" component="p">
                Create, edit, and manage your Organization tasks.
              </Typography>
              <Link to={Paths.TEMPLATE} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px", borderRadius: "20px" }}
                >
                  View Template
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            style={{ marginTop: "20px", borderRadius: "20px", padding: "15px" }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Settings
              </Typography>
              <Typography variant="body1" component="p">
                Configure your settings and preferences.
              </Typography>
              <Link to={Paths.SETTINGS} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px", borderRadius: "20px" }}
                >
                  Go to Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
