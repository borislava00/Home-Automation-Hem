import styles from "./Weather.module.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Weather({ degrees, type }) {
  const types = {
    cloudy: "/images/cloudy.svg",
    rainy: "/images/rainy.svg",
    snowy: "/images/snowy.svg",
    stormy: "/images/stormy.svg",
    sunny: "/images/sunny.svg",
  };
  return (
    <div className={styles["weather-wrapper"]}>
      <Grid container>
        <Grid item xs={5}>
          <img src={types[type]} className={styles.image} />
        </Grid>
        <Grid item xs={7}>
          <Typography fontWeight="400" variant="body2" style={{ color: "#7441F3" }}>
            Weather
          </Typography>
          <Typography
            variant="h1"
            color="initial"
            className={styles["text-container"]}
            fontSize={{ xs: "1.5rem", lg: "3rem" }}
          >
            {degrees}&deg;
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
