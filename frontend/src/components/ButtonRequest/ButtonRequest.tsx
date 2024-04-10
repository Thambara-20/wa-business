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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateButton } from "../../redux/template/slice";

type Header = {
  key: string;
  value: string;
};

interface HttpRequest {
  method: string;
  url: string;
  headers: { [key: string]: string };
  body?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (request: HttpRequest) => void;
}

const HttpRequestDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [bodyError, setBodyError] = useState<string | null>(null); // State to track body validation error
  const dispatch = useAppDispatch();
  const buttonId = useAppSelector((state) => state.template.selectedButtonId);
  const button = useAppSelector((state) =>
    state.template.buttons.find((button) => button.id === buttonId)
  );
  const [headers, setHeaders] = useState<Header[]>(
    (button?.headers as Header[]) || [{ key: "", value: "" }]
  );

  console.log("button", button?.id);

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

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bodyText = event.target.value;
    try {
      JSON.parse(bodyText);
      setBodyError(null);
    } catch (error) {
      setBodyError("Invalid JSON format");
    }
    dispatch(updateButton({ id: buttonId, body: bodyText }));
  };

  const handleSubmit = () => {
    dispatch(
      updateButton({
        id: buttonId,
        headers: headers,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={bodyError ? undefined : onClose}>
      <DialogTitle>Edit Request</DialogTitle>
      <DialogContent
        sx={{
          maxHeight: "64vh",
        }}
      >
        <InputLabel>Method</InputLabel>
        <FormControl fullWidth>
          <Select
            value={button?.method || "GET"}
            onChange={(event) =>
              dispatch(
                updateButton({ id: buttonId, method: event.target.value })
              )
            }
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
          value={button?.link || ""}
          onChange={(event) =>
            dispatch(updateButton({ id: buttonId, link: event.target.value }))
          }
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
          value={button?.body || ""}
          onChange={handleBodyChange}
          margin="normal"
          error={!!bodyError} // Set error state based on body validation
          helperText={bodyError} // Show validation error message
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={bodyError ? undefined : onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!!bodyError}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HttpRequestDialog;
