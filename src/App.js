import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(" ");
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    axios
      .get("https://6cw4vl6ty7.execute-api.ap-northeast-1.amazonaws.com/dev")

      .then((res) => setUsers(res.data.body.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (search) {
      setSearched(
        users.filter((user) => {
          return Object.values(user)

            .join("")
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    } else {
      setUsers(users);
    }
  }, [search]);
  return (
    <div className="App">
      <h1>Fetch Data from API</h1>
      <input
        onChange={(event) => setSearch(event.target.value)}
        placeholder="search the data from list....."
        className="search"
      />
      <div className="grid-main">
        {search.length > 0
          ? searched.map((sach) => {
              return (
                <div className="grid-child">
                  <h3>Device_Id:-{sach.DeviceID}</h3>
                  <p style={{ color: "blue" }}>
                    1.CameraType:-{sach.CameraType}
                  </p>
                  <p style={{ color: "red" }}>2.UserID:-{sach.UserID}</p>
                  <p style={{ color: "green" }}>
                    3.SnapshotSignedUrl:-{sach.SnapshotSignedUrl}
                  </p>
                </div>
              );
            })
          : users?.map((people) => {
              return (
                <div className="grid-child">
                  <h3>Device_Id:-{people.DeviceID}</h3>
                  <p style={{ color: "blue" }}>
                    1.CameraType:-{people.CameraType}
                  </p>
                  <p style={{ color: "red" }}>2.UserID:-{people.UserID}</p>
                  <p style={{ color: "green" }}>
                    3.SnapshotSignedUrl:-{people.SnapshotSignedUrl}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
