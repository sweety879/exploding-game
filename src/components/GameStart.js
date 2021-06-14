/* eslint-disable react-hooks/exhaustive-deps */
import "./GameStart.css";
import React, { useState, useEffect } from "react";
import api from "../services/api";

function GameStart(props) {
  const [currentCards, setCurrentCards] = useState([]);
  const [saved, setSaved] = useState([]);
  const [defuseCount, setDefuseCount] = useState(0);
  const [showcard, setShowcard] = useState(false);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  let i,
    generateCards = [];

  useEffect(() => {
    setMessage("");
    api.get("/savedgames/" + props.props.match.params.id).then((response) => {
      setSaved(response.data);
      //   console.log(
      //     response.data.values.unpickedcards,
      //     response.data.values.defusedcards
      //   );
      //   console.log(response.data.values.unpickedcards.length);
      if (response.data.values.unpickedcards.length !== 0) {
        //  console.log('if');
        setCurrentCards(response.data.values.unpickedcards);
        setDefuseCount(response.data.values.defusedcards);
      } else {
        //   console.log('else');
        for (i = 0; i < 5; i++) {
          var index = Math.floor(Math.random() * 4 + 1);
          switch (index) {
            case 1:
              generateCards.push({ id: i + 1, value: "bomb" });
              break;
            case 2:
              generateCards.push({ id: i + 1, value: "shuffle" });
              break;
            case 3:
              generateCards.push({ id: i + 1, value: "defuse" });
              break;
            case 4:
              generateCards.push({ id: i + 1, value: "cat" });
              break;
            default:
          }
        }
        saved.values.unpickedcards = generateCards;
        setCurrentCards(generateCards);
        api.put("/savedgames/" + saved.id, saved);
      }
    });
  }, []);

  function remainingCards(id) {
    let card = currentCards.filter((c) => c.id === id);
    let nextCards = currentCards.filter((c) => c.id !== card[0].id);
    switch (card[0].value) {
      case "bomb": {
        if (defuseCount > 0) {
          setCurrentCards(nextCards);
          setDefuseCount((prevCount) => prevCount - 1);
          saved.values.defusedcards = defuseCount - 1;
          saved.values.unpickedcards = nextCards;
        } else {
          setMessage("You lost the game..!");

          setCurrentCards([]);
          saved.values.defusedcards = 0;
          saved.values.unpickedcards = [];
        }

        break;
      }
      case "cat": {
        setCurrentCards(nextCards);
        saved.values.defusedcards = defuseCount;
        saved.values.unpickedcards = nextCards;
        break;
      }
      case "defuse": {
        setDefuseCount((prevCount) => prevCount + 1);
        setCurrentCards(nextCards);
        saved.values.defusedcards = defuseCount + 1;
        saved.values.unpickedcards = nextCards;
        break;
      }
      case "shuffle": {
        setDefuseCount(0);
        setMessage("cards are shuffled");
        setTimeout(() => setMessage(""), 1000);
        for (i = 0; i < 5; i++) {
          var index = Math.floor(Math.random() * 4 + 1);
          switch (index) {
            case 1:
              generateCards.push({ id: i + 1, value: "bomb" });
              break;
            case 2:
              generateCards.push({ id: i + 1, value: "shuffle" });
              break;
            case 3:
              generateCards.push({ id: i + 1, value: "defuse" });
              break;
            case 4:
              generateCards.push({ id: i + 1, value: "cat" });
              break;
            default:
          }
        }

        setCurrentCards(generateCards);
        saved.values.defusedcards = defuseCount;
        saved.values.unpickedcards = generateCards;
        nextCards = generateCards;
        break;
      }
      default:
    }

    if (nextCards.length === 0) {
      setMessage("Yaay..!You won");

      ++saved.scores;

      saved.values.defusedcards = 0;
      saved.values.unpickedcards = [];
    }
    setSelected(0);
    setShowcard(false);
    api.put("/savedgames/" + saved.id, saved);
  }

  return (
    <div className="d-flex flex-row">
      <div className="d-flex background flex-column justify-content-center">
        <div className="m-3 p-5 d-flex flex-row justify-content-center">
          {currentCards.map((item) => (
            <div>
              {selected === item.id && showcard ? (
                <div className="m-2 p-5 game-card-bomb shadow-sm d-flex flex-column justify-content-center text-center">
                  <b
                    style={{
                      color: "white",
                      fontSize: "25px",
                    }}
                  >
                    {item.value}{" "}
                  </b>
                </div>
              ) : (
                <div
                  className="m-2 p-5 game-card-back shadow-sm d-flex flex-column justify-content-center"
                  onClick={() => {
                    setSelected(item.id);
                    setShowcard(true);
                    setTimeout(() => {
                      remainingCards(item.id);
                    }, 1000);
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
        {message ? (
          <p className="text-light p-5">
            <b>{message}</b>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GameStart;
