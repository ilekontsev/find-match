import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login1 from "../Login/Login1";
import Game from "../Game/Game";
import Score from "../Score/Score";
import Storage from "../../utils/Storage";
import { UserDesc } from "../../interfaces/interfaces";
import "./App.css";

const App = () => {
  const [user, setUser] = useState<UserDesc>({ name: "player", score: 0 });
  const [currentScore, setCurrentScore] = useState(0);

  const loginUser = (user: string) => {
    let allUsers: UserDesc[] = Storage.getItem("users") || [];
    Storage.setItem<UserDesc>("user", { name: user, score: 0 });

    const selectUser = allUsers.find((item) => item.name === user);

    if (selectUser === undefined) {
      allUsers = allUsers.concat({ name: user, score: 0 });
      Storage.setItem("users", allUsers);
      setUser({ name: user, score: 0 });
      return;
    }
    setUser(selectUser);
  };

  const scoreNow = (score: number) => {
    setCurrentScore(score);
  };

  return (
    <BrowserRouter>
      <div className="root-wrap-app">
        <div className="wrap-app">
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Login1 loginUser={loginUser} />}
            />
            <Route
              path="/game"
              component={() => <Game user={user} scoreNow={scoreNow} />}
            />
            <Route
              path="/score"
              component={() => (
                <Score user={user} CurrentScore={currentScore} />
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
