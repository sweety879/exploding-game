import "./leaderBoard.css";
import Profile from "./profile.js";
import { useEffect, useState } from "react";
import api from "../services/api";
// let data = [
//   { name: "John Hurt", points: 5432 },
//   { name: "Donna Noble", points: 2321 },
//   { name: "Martha Jones", points: 6542 },
//   { name: "Amy Pond", points: 8991 },
//   { name: "Clara Oswald", points: 3654 },
//   { name: "Rose Tyler", points: 1587 },
//   { name: "Rory Pond", points: 4268 },
//   { name: "John Hurt", points: 5432 },
//   { name: "Donna Noble", points: 2321 },
//   { name: "Martha Jones", points: 6542 },
//   { name: "Amy Pond", points: 8991 },
//   { name: "Clara Oswald", points: 3654 },
//   { name: "Rose Tyler", points: 1587 },
//   { name: "Rory Pond", points: 4268 },
//   { name: "John Hurt", points: 5432 },
//   { name: "Donna Noble", points: 2321 },
//   { name: "Martha Jones", points: 6542 },
//   { name: "Amy Pond", points: 8991 },
//   { name: "Clara Oswald", points: 3654 },
//   { name: "Rose Tyler", points: 1587 },
//   { name: "Rory Pond", points: 4268 },
// ];

function LeaderBoard(Id) {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    api.get("/savedgames").then((response) => {
      setPoints(response.data);
    });
  }, []);

  return (
    <div className="w-100 background-img">
      <Profile id={Id} />
      <h1 className="text-light">Leader Board</h1>
      {points.map((each) => (
        <div className="card bg-transperant text-light m-1 d-flex flex-row">
          <p className="m-2 w-100">{each.username}</p>
          <p className="m-2">{each.scores}</p>
        </div>
      ))}
    </div>
  );
}

export default LeaderBoard;
