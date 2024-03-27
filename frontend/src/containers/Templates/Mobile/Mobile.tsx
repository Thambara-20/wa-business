import React from "react";
import { Button, Container, Box, CssBaseline } from "@mui/material";


function MobileScreenWithButton() {
  const handleClickWhatsAppButton = () => {
    console.log("WhatsApp Button Clicked!");
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          position: "relative",
          borderRadius: "20px",
          border: "2px solid #000",
          margin: "20px",
          minWidth: "280px",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "20px",
            borderBottom: "1px solid #000",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "2px",
            borderBottom: "1px solid #000",
            position: "absolute",
            top: "30px",
            left: 0,
            backgroundColor: "#fff",
          }}
        ></div>

        <Container
          style={{
            height: "calc(100% - 40px)",
            padding: "10px",
            border: "none",
            position: "relative",
          }}
        >
          <h3 style={{textAlign:"center"}}>Your Template</h3>
          <p style={{textAlign:"center"}}>Your content goes here, test now</p>

          <Button
            variant="contained"
            color="primary"
            style={{
              position: "absolute",
              bottom: "30px", 
              right: "20px",
              borderRadius: "20px",
              backgroundColor: "#388e3c",
              color: "#fff",
            }}
            onClick={handleClickWhatsAppButton}
          >
            Sample
          </Button>
        </Container>
        <div
          style={{
            width: "93%",
            backgroundColor: "#ccc",
            position: "absolute",
            bottom: "0",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            textAlign: "center",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <div
            style={{
              width: "60px", 
              height: "15px",
              backgroundColor: "#fff", 
              borderRadius: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          </div>
        </div>
      </Box>
    </>
  );
}

export default MobileScreenWithButton;
