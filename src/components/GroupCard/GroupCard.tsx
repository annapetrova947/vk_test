import "./style.css";
import { useState } from "react";
import { Group, User } from "../../types";

export function GroupCard(props: Group) {
  const [shownFriensList, setShownFriensList] = useState(false);

  let friendsListClass = `${shownFriensList ? "" : "card__friends-list_hidden"}`;

  function handleClickFriends() {
    setShownFriensList(!shownFriensList);
  }

  return (
    <div className="сard">
      <div
        className="card__avatar"
        style={{
          backgroundColor: `${props.avatar_color ? props.avatar_color : ""}`,
        }}
      ></div>
      <div className="card__info">
        <p className="card__name">{`${props.name}`}</p>
        {props.closed ? (
          <p className="card__closed">Закрытая</p>
        ) : (
          <p className="card__closed">Открытая</p>
        )}
        <p className="card__followers">Подписчики: {props.members_count}</p>
        {props.friends !== undefined ? (
          <p className="card__friends" onClick={handleClickFriends}>
            Друзья: {props.friends.length}
          </p>
        ) : (
          ""
        )}
        <div className={friendsListClass}>
          {props.friends === undefined
            ? ""
            : props.friends.map((user: User, i) => (
                <p
                  className="card__friend"
                  key={i}
                >{`${user.first_name} ${user.last_name}`}</p>
              ))}
        </div>
      </div>
    </div>
  );
}
