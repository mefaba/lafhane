import axios from "axios";

export const fetch_total_point = (point, username) => {
  axios
    .put(`https://lafhane-server.herokuapp.com/api/scores/${username}`, {
      point: point,
    })
    .catch((err) => console.log(err));
};
