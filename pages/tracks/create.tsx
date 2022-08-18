import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";

import StepWrapper from "../../components/StepWrapper";
import MainLayout from "../../layouts/MainLayout";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "../../node_modules/next/router";

const Create = () => {
  const [count, setCount] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const router = useRouter();

  return (
    <div className="center">
      <MainLayout>
        <StepWrapper activeStep={count}>
          {count === 0 && (
            <Grid
              container
              direction="column"
              style={{ padding: "20px", gap: "20px" }}
            >
              <TextField {...name} label="Name track" />
              <TextField {...artist} label="Name artist" />
              <TextField {...text} label="Text for track" multiline rows="3" />
            </Grid>
          )}
          {count === 1 && (
            <FileUpload setFile={setPicture} accept="image/*">
              <Button
                variant="contained"
                style={{ margin: "30px", width: "90%" }}
              >
                Download image
              </Button>
            </FileUpload>
          )}
          {count === 2 && (
            <FileUpload setFile={setAudio} accept="audio/*">
              <Button
                variant="contained"
                style={{ margin: "30px", width: "90%" }}
              >
                Download track
              </Button>
            </FileUpload>
          )}
        </StepWrapper>
        <Grid
          container
          justifyContent="space-between"
          style={{ padding: "0 50px" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              count > 0 && setCount(count - 1);
            }}
            disabled={count === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              count < 3 && setCount(count + 1);
              if (count == 2) {
                const formData = new FormData();
                formData.append("name", name.value);
                formData.append("artist", artist.value);
                formData.append("text", text.value);
                formData.append("picture", picture);
                formData.append("audio", audio);
                axios
                  .post("http://localhost:5000/tracks", formData)
                  .then(() => {
                    router.push("/tracks");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            }}
            disabled={count === 3}
          >
            Continue
          </Button>
        </Grid>
      </MainLayout>
      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default Create;
