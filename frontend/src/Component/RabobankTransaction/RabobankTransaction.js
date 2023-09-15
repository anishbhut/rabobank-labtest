import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Paper, Typography } from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { styled } from "@mui/material/styles";
import ListData from "../ListData/ListData";
import { INVALID_FILE_TYPE } from "../../config/constant";

import "./RabobankTransaction.css";
import fetchValidatedData from "./Service";
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const RabobankTransaction = () => {
  const [file, setFile] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const isFileValid =
    file &&
    file.type !== "" &&
    file.type !== "text/csv" &&
    file.type !== "text/xml"
      ? INVALID_FILE_TYPE
      : "";

  const handleFileChange = (event) => {
    setError("");
    if (event.target.files) {
      setFile(event.target.files[0]);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (isFileValid !== "") {
      setResponseData([]);
      setSuccess(false);
    }
  }, [isFileValid]);

  const handleUploadClick = () => {
    setResponseData([]);
    setSuccess(false);
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("uploadfile", file, file.name);
    fetchValidatedData(data)
      .then((response) => {
        response = response.data;
        if (response && response?.data) {
          setResponseData(response.data);
          if (response?.data.length === 0) {
            setSuccess(true);
          }
        } else {
          setError(response.error);
          setSuccess(false);
        }
      })
      .catch(function (error) {
        // can be handle with toast message
      });
  };

  return (
    <div className="rabo-bank-transaction">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <h1>Rabobank Customer Statement Processor</h1>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Item>
            <Button
              component="label"
              variant="contained"
              startIcon={<InsertDriveFileOutlinedIcon />}
              href="#file-upload"
              sx={{ marginRight: "10px" }}
            >
              Select a file
              <VisuallyHiddenInput
                type="file"
                className="file-upload"
                inputProps={{
                  "data-testid": "file-upload",
                }}
                onChange={handleFileChange}
              />
            </Button>
            <Button
              component="label"
              variant="contained"
              startIcon={<RuleIcon />}
              href="#file-upload"
              onClick={handleUploadClick}
              disabled={!file}
            >
              Validate Data
            </Button>
            <Typography>{file && file.name !== "" ? file.name : ""}</Typography>
            <Typography className="error">{isFileValid}</Typography>
            {error && error !== "" ? (
              <Typography className="error">{error}</Typography>
            ) : (
              ""
            )}
          </Item>
        </Grid>

        {responseData && responseData.length > 0 ? (
          <Grid item xs={12}>
            <Item>
              <ListData data={responseData} />
            </Item>
          </Grid>
        ) : (
          ""
        )}
        {success && (
          <Grid item xs={12}>
            <Item>
              <Typography>All records are validated and no error found!</Typography>
            </Item>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default RabobankTransaction;
