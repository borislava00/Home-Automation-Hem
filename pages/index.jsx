import { Container, Grid, Typography } from "@mui/material";
import Navigation from "../src/components/navigation/Navigation";
import Header from "../src/components/header/Header";
import Weather from "../src/components/weather/Weather";
import Time from "../src/components/time/Time";
import User from "../src/components/user/User";
import Thermostat from "../src/components/thermostat/Thermostat";
import Scenes from "../src/components/scenes/Scenes";
import Cameras from "../src/components/cameras/Cameras";
import Rooms from "../src/components/rooms/Rooms";
import Energy from "../src/components/energy/Energy";

import styles from "./Dashboard.module.scss";
import { useContext, useEffect } from "react";
import { AppContext } from "../src/components/common/AppProvider";

export default function Dashboard() {
  const [refresh] = useContext(AppContext);
  const data = [
    { temperature: 25, hour: 12 },
    { temperature: 13, hour: 13 },
    { temperature: 14, hour: 14 },
    { temperature: 15, hour: 15 },
    { temperature: 15, hour: 16 },
    { temperature: 16, hour: 17 },
  ];
  const cameras = [
    { videoUrl: "../videos/balcony.mp4" },
    { videoUrl: "../videos/bathroom.mp4" },
    { videoUrl: "../videos/front-door.mp4" },
    { videoUrl: "../videos/living room 2.mp4" },
    { videoUrl: "../videos/garden.mp4" },
    { videoUrl: "../videos/kitchen.mp4" },
  ];

  const cards = [
    { iconUrl: "../images/alarm-clock.svg", outlined: false },
    { iconUrl: "../images/shower.svg", outlined: false },
    { iconUrl: "../images/morning.svg", outlined: false },
    { iconUrl: "../images/rock.svg", outlined: false },
    { iconUrl: "../images/tea-cup.svg", outlined: false },
    { iconUrl: "../images/plus.svg", outlined: true },
  ];

  const rooms = [
    { iconUrl: "../images/alarm-clock.svg", outlined: false, title: "Bedroom" },
    { iconUrl: "../images/alarm-clock.svg", outlined: false, title: "Bedroom" },
    { iconUrl: "../images/alarm-clock.svg", outlined: false, title: "Bedroom" },
  ];

  async function getData() {
    const rooms = fetch("https://hem-api.herokuapp.com/rooms", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).catch(error => console.log(error));

    const properties = fetch("https://hem-api.herokuapp.com/properties", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).catch(error => console.log(error));

    const devices = fetch("https://hem-api.herokuapp.com/devices", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).catch(error => console.log(error));

    const scenes = fetch("https://hem-api.herokuapp.com/scenes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).catch(error => console.log(error));

    const thermostats = fetch("https://hem-api.herokuapp.com/thermostats", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).catch(error => console.log(error));

    Promise.all([rooms, properties, devices, scenes, thermostats])
      .then(res => Promise.all(res.map(element => element.json())))
      .then(data =>
        data.forEach(element => {
          console.log(element);
        })
      );
  }
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Container className={styles.container}>
      <Grid container className={styles["grid-container"]}>
        <Grid item className={styles["header-container"]}>
          <Header
            left={
              <User
                avatar="../images/avatar.png"
                name="John Doe"
                headingSize="h2"
                hasWelcome={true}
              />
            }
            right={
              <>
                <Weather degrees={22} type="cloudy" /> <Time />
              </>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
