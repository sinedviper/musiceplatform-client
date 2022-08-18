import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "../../node_modules/next/router";
import { Button, Grid, TextField } from "@mui/material";
import { GetServerSideProps } from "next-redux-wrapper";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { ITrack } from "../../types/track";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/tracks/comment", {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, res.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="center">
      <MainLayout title={"Musice " + track.name + "-" + track.artist}>
        <Button
          variant="contained"
          style={{ padding: "10px 40px" }}
          onClick={() => router.push("/tracks")}
        >
          Back
        </Button>
        <Grid container>
          <img
            src={"http://localhost:5000/" + track.picture}
            style={{ width: 200, heght: 200, margin: "30px 40px 30px 0" }}
          />
          <div style={{ marginTop: "30px" }}>
            <h2>Name track - {track.name}</h2>
            <h2 style={{ color: "grey", fontSize: 20 }}>
              Artist - {track.artist}
            </h2>
            <h2 style={{ color: "grey", fontSize: 20 }}>
              Listens - {track.listens}
            </h2>
          </div>
        </Grid>
        <h2>Words in track</h2>
        <p>{track.text}</p>
        <h2>Comment</h2>
        <Grid>
          <TextField
            {...username}
            label="Your name"
            fullWidth
            style={{ margin: "0 0 20px" }}
          />
          <TextField {...text} label="Comment" fullWidth multiline rows="4" />
          <Button
            onClick={addComment}
            variant="contained"
            style={{ margin: "20px 0", padding: "10px 40px" }}
          >
            Send
          </Button>
        </Grid>
        <div>
          {track.comments.map((comment) => (
            <>
              <div key={comment._id}>
                <div>Author - {comment.username}</div>
                <div>Comment - {comment.text}</div>
              </div>
            </>
          ))}
        </div>
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

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await axios.get("http://localhost:5000/tracks/" + params.id);
  return {
    props: {
      serverTrack: res.data,
    },
  };
};
