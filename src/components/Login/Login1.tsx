import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { InputBase } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./Login.css";
import { UserDesc } from "../../interfaces/interfaces";

function Login(props: any) {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const writeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const textInput = e.target.value;
    setValue(textInput);
    if (textInput) {
      const allUsers: UserDesc[] = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      const arrSearch: string[] = [];
      allUsers.forEach((item) => {
        if (item.name.toUpperCase().includes(textInput.toUpperCase())) {
          // @ts-ignore
          arrSearch.push({ name: item.name });
        }
      });
      // @ts-ignore
      setUsers(arrSearch);
      return 0;
    }
    setUsers([]);
  };
  const saveLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const buttonCode = e.key;
    const user = target.value;
    if (buttonCode === "Enter" && user.trim().length) {
      setValue("");
      history.push("/game");
      props.loginUser(user);
    }
  };
  const showUsers = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(allUsers);
  };
  const selectUser = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const user = target.innerText;
    history.push("/game");
    props.loginUser(user);
  };
  const hiddenBlockSearch = () => {
    setUsers([]);
  };
  // @ts-ignore
  return (
    <div className="root-wrap-login" onClick={hiddenBlockSearch}>
      <div className="wrap-login">
        <div className="wrap-text-login">
          <p>Game</p>
          <p>Find Matches</p>
        </div>
        <div className="wrap-input-login">
          <InputBase
            placeholder={"Input name..."}
            className="input-login"
            value={value}
            onChange={writeInput}
            onKeyDown={saveLogin}
            endAdornment={
              <InputAdornment position="end">
                <ArrowDropDownIcon
                  className={"icon-input-login"}
                  onClick={showUsers}
                />
              </InputAdornment>
            }
          />
          <div className={users ? "result-users-login" : "hidden-block"}>
            {users.map((item: UserDesc) => (
              <div
                key={item.name + 12}
                className="element-user-login"
                onClick={selectUser}
              >
                <p className="item-login">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
