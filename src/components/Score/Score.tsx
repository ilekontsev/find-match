import React, { useEffect, useState } from "react";
import "./Score.css";
import { useHistory } from "react-router-dom";
import { UserDesc } from "../../interfaces/interfaces";

function Score(props: any) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    index: 1,
    name: "player",
    score: 0,
  });
  const history = useHistory();
  useEffect(() => {
    const allUsers: UserDesc[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const updUser = allUsers.filter((item) => {
      if (item.name === props.user.name && item.score < props.CurrentScore) {
        item.score = props.CurrentScore;
      }
      return item;
    });
    updUser.sort((item1, item2) => item2.score - item1.score);
    // @ts-ignore
    setUsers(updUser);
    // eslint-disable-next-line array-callback-return
    updUser.forEach((item, index: number) => {
      if (item.name === props.user.name) {
        item.index = index + 1;
        // @ts-ignore
        setCurrentUser(item);
      }
    });
    localStorage.setItem("users", JSON.stringify(updUser));
  }, []);

  const restartGame = () => {
    history.push("/game");
  };
  const logout = () => {
    history.push("/");
  };

  return (
    <div className="root-wrap-score">
      <div className="wrap-score">
        <table className="table-wrap-score">
          <thead>
            <tr>
              <th>№</th>
              <th>User</th>
              <th>Current score</th>
              <th>Best score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentUser.index}</td>
              <td>{currentUser.name}</td>
              <td>{props.CurrentScore}</td>
              <td>{currentUser.score}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="wrap-button-score">
        <button
          onClick={restartGame}
          className="restart-button-score but-score"
        >
          Restart game
        </button>
        <button onClick={logout} className="logout-button-score but-score">
          New user
        </button>
      </div>

      <div className="wrap-score">
        <table className="table-wrap-score">
          <thead>
            <tr>
              <th>№</th>
              <th>Users</th>
              <th>Best score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item: UserDesc, index: number) => (
              <tr key={index + item.name}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Score;
