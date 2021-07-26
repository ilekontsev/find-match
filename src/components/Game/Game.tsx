import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CardsDesc, UserDesc } from "../../interfaces/interfaces";
import Storage from "../../utils/Storage";
import "./Game.css";

function Game(props: any) {
  // создание массива с карточками
  let createCardsArr: CardsDesc[] = [];
  for (let i = 0; i < 12; i++) {
    createCardsArr[i] = {
      id: i,
      isActive: true,
      findMatch: false,
      card: `/assets/${i + 1}.jpg`,
    };
  }
  // дублируем карточки и перемешиваем
  const duplicateCardsArray = createCardsArr.map((item) => ({ ...item }));
  createCardsArr = createCardsArr.concat(duplicateCardsArray);
  function shuffle(array: CardsDesc[]) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(createCardsArr);

  const [cardArr, setCardArr] = useState(createCardsArr);
  const [blockOnClick, setBlockOnClick] = useState(true);
  const [user, setUser] = useState({ name: "player" });
  const [score, setScore] = useState(0);
  const history = useHistory();

  // перевернуть карточки
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
    setTimeout(() => {
      const hiddenFront = createCardsArr.map((item) => {
        if (item.isActive) {
          item.isActive = false;
          return item;
        }
        return item;
      });
      setCardArr(hiddenFront);
    }, 3000);
  }, []);

  // переворачиваем выбраную карту
  const changeIsActive = (value: CardsDesc, ind: number) => {
    return cardArr.filter((item, index: number) => {
      if (index === ind) {
        item.isActive = true;
        return item;
      }
      return item;
    });
  };

  const gameOver = (updCardArr: CardsDesc[]) => {
    const checkFull = updCardArr.every((item) => item.findMatch);
    if (checkFull) {
      setTimeout(() => {
        history.push("/score");
        props.scoreNow(score + 100);
      }, 1600);
    }
  };

  const funcScore = (updChecked: boolean) => {
    console.log(updChecked);
    if (!updChecked && score !== 0) {
      setScore(score - 20);
    }
    if (updChecked) {
      setScore(Number(score) + 100);
    }
  };
  // сравниваем карточки
  const updateCard = (
    firstElement: CardsDesc,
    secondElement: CardsDesc,
    updChecked: boolean
  ) => {
    const updCardArr = cardArr.filter((item) => {
      if (firstElement === item || secondElement === item) {
        item.isActive = updChecked;
        item.findMatch = updChecked;
        return item;
      }
      return item;
    });
    funcScore(updChecked);
    gameOver(updCardArr);
    setCardArr(updCardArr);
    setBlockOnClick(true);
  };

  const handleClickCard = (value: CardsDesc, ind: number) => {
    if (blockOnClick) {
      setCardArr(changeIsActive(value, ind));

      const openCard = cardArr.filter(
        (item) => item.isActive && !item.findMatch
      );
      const [firstElement, secondElement] = openCard;
      if (openCard.length === 2) {
        setBlockOnClick(false);

        if (firstElement.id === secondElement.id) {
          updateCard(firstElement, secondElement, true);
        } else {
          setTimeout(() => {
            updateCard(firstElement, secondElement, false);
          }, 700);
        }
      }
    }
  };
  return (
    <div className="root-wrap-game">
      <div className="wrap-score-game">
        <div className="block-score-user">
          {user.name}: {score}
        </div>
      </div>

      <div className="wrap-game">
        {cardArr.map((item, index: number) => (
          <div
            key={index}
            onClick={() => handleClickCard(item, index)}
            className={item.isActive ? "game-card flip" : "game-card"}
          >
            <div className="wrap-front-card">
              <img src={item.card} alt="" className="front-card" />
            </div>
            <div className="wrap-front-back">
              <img src="/assets/backimg.png" alt="" className="back-card" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
