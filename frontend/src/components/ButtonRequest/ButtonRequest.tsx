import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface Header {
  key: string;
  value: string;
}

interface HttpRequest {
  method: string;
  url: string;
  headers: { [key: string]: string };
  body?: string;
}

interface Props {
  buttonId: number;
  open: boolean;
  onClose: () => void;
  onSubmit: (request: HttpRequest) => void;
}

const HttpRequestDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  buttonId,
}) => {
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState("");

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    if (headers.length === 1) {
      return;
    }
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  const handleHeaderChange = (index: number, key: string, value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { key, value };
    setHeaders(updatedHeaders);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Request</DialogTitle>
      <DialogContent
        sx={{
          maxHeight: "80vh",
        }}
      >
        <InputLabel>Method</InputLabel>
        <FormControl fullWidth>
          <Select
            value={method}
            onChange={(event) => setMethod(event.target.value as string)}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="URL"
          fullWidth
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          margin="normal"
        />
        <div>
          <InputLabel>Headers</InputLabel>
          {headers.map((header, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <TextField
                label="Key"
                value={header.key}
                onChange={(event) =>
                  handleHeaderChange(index, event.target.value, header.value)
                }
                margin="normal"
              />
              <TextField
                label="Value"
                value={header.value}
                onChange={(event) =>
                  handleHeaderChange(index, header.key, event.target.value)
                }
                margin="normal"
              />
              <Button
                sx={{ marginTop: "6px" }}
                onClick={() => handleRemoveHeader(index)}
              >
                remove
              </Button>
            </div>
          ))}
          <Button variant={"contained"} onClick={handleAddHeader}>
            +
          </Button>
        </div>
        <TextField
          label="Body"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HttpRequestDialog;
