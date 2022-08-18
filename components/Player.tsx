import React, { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styles from "../styles/Player.module.scss";
import { ITrack } from "../types/track";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

let audio;

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } =
    useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton style={{ margin: "0 10px", color: "white" }} onClick={play}>
        {!pause ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 14, color: "#ccc" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={Math.floor(currentTime)}
        right={Math.floor(duration)}
        onChange={changeCurrentTime}
      />
      <VolumeUpIcon style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
