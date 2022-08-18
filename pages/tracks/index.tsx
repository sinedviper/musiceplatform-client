import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Card, Grid, Button, Box } from "@mui/material";
import { useRouter } from "../../node_modules/next/router";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store/index";
import { fetchTracks, searchTracks } from "../../store/actions-creators/track";
import { TextField } from "../../node_modules/@mui/material/index";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const { tracks, error } = useTypedSelector((state) => state.track);
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    );
  };

  if (error) {
    return (
      <MainLayout>
        <h2>{error}</h2>
      </MainLayout>
    );
  }

  return (
    <div className="center">
      <MainLayout title="List track">
        <Grid container justifyContent="center">
          <Card>
            <Box sx={{ width: "900px", padding: "0 40px" }}>
              <Grid container justifyContent="space-between">
                <h1>Track list</h1>
                <Button
                  variant="contained"
                  style={{ margin: "20px 0" }}
                  onClick={() => router.push("/tracks/create")}
                >
                  Download
                </Button>
              </Grid>
            </Box>
            <TextField fullwidth value={query} onChange={search} />
            <TrackList tracks={tracks} />
          </Card>
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

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(await fetchTracks());
    }
);
