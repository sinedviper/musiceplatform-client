import React from "react";
import { ITrack } from "../types/track";
import { Card, IconButton, Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import styles from "../styles/TrackItem.module.scss";
import { useRouter } from "../node_modules/next/router";
import { useActions } from "../hooks/useActions";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActive } = useActions();

  const play = (e) => {
    e.stopPropagation();
    setActive(track);
    playTrack();
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
      style={{ cursor: "pointer" }}
    >
      <IconButton style={{ margin: "0 10px" }} onClick={play}>
        {active ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </IconButton>
      <img
        src={"http://localhost:5000/" + track.picture}
        style={{ margin: "0 20px", width: "70px", height: "70px" }}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 14, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton
        style={{ marginLeft: "auto", marginRight: "10px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
