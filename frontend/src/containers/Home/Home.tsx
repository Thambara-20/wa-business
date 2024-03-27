import React from "react";
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

const HomePage = () => {
  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        style={{ marginTop: "50px", textAlign: "center" }}
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
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Manage Message Templates
              </Typography>
              <Typography variant="body1" component="p">
                Create, edit, and manage your Organization tasks.
              </Typography>
              <Link to={Paths.TEMPLATES} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                >
                  View Templates
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
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
                  style={{ marginTop: "20px" }}
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
