import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import api from "../services/api";

function Instructions(props) {
  let temp = {};
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const onSave = () => {
    if (name) {
      let flag = true;
      api.get("/savedgames").then((response) => {
        response.data.forEach((e) => {
          if (name === e.username) {
            flag = false;
            props.history.push("/gamestart/" + e.id);
          }
        });
        if (flag) {
          let id = uuidv4();

          api.post("/savedgames", {
            id: id,
            username: name,
            values: { defusedcards: 0, unpickedcards: [] },
            scores: 0,
          });
          props.history.push("/gamestart/" + id);
        }
      });
    } else {
      setError(true);
    }
  };
  return (
    <div className="container bg-light mt-5">
      <h1>Instructions</h1>
      <p>
        This will be an online single-player card game that consists of 4
        different types of cards
        <br />
        <ul>
          <li>Cat card 😼</li>
          <li>Defuse card 🙅‍♂️</li>
          <li>Shuffle card 🔀</li>
          <li>Exploding kitten card 💣</li>
        </ul>
        <div className="card bg-light shadow-sm p-3">
          Each time user clicks on the deck a card is revealed and that card is
          removed from the deck. A player wins the game once he draws all the 5
          cards from the deck and there is no card left to draw. Rules – - If
          the card drawn from the deck is a cat card, then the card is removed
          from the deck. - If the card is exploding kitten (bomb) then the
          player loses the game. - If the card is defusing card, then the card
          is removed from the deck. This card can be used to defuse one bomb
          that may come in subsequent cards drawn from the deck. - If the card
          is shuffle card, then the game is restarted and the deck is filled
          with 5 cards again.
        </div>
      </p>
      <label>Username </label>
      <input
        className="m-1 p-1 shadow-sm form-control"
        style={{ width: "25%" }}
        placeholder="Name"
        required
        type="text"
        onChange={(event) => {
          setName(event.target.value);
          onsubmit = { onSave };
        }}
      />
      {error ? <p style={{ color: "red" }}>Username is required</p> : ""}
      <br />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          onSave();
        }}
      >
        Start
      </button>
    </div>
  );
}

export default Instructions;
