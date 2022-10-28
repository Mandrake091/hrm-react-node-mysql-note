import React, { memo, useEffect, useContext, useState } from "react";
import { userContext } from "../pages/Home";

function Note() {
  const { setNoteUpdate } = useContext(userContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/getNotes/")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setData(data.message);
      });
  }, [setNoteUpdate]);

  const submit = (e, note_id) => {
    e.preventDefault();
    fetch("/api/deleteNote/", {
      method: "POST",
      body: JSON.stringify({ note_id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("/api/getNotes/")
          .then((res) => res.json())
          .then((data) => {
            if (data.status) setData(data.message);
          });
      });
  };

  return (
    <>
      {data === [] ? (
        <p>Empty</p>
      ) : (
        data.map((el) => (
          <div
            className="card create-title"
            key={el.note_id}
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">{el.title}</h5>
              <h6
                className="card-subtitle mb-2 text-muted"
                style={{ fontSize: "0.9rem" }}
              >
                {el.date}
              </h6>
              <p className="card-text">{el.note}</p>
              <div className="row justify-content-end">
                {" "}
                <button
                  className="btn text-align-end"
                  style={{ width: "70px" }}
                  onClick={(e) => submit(e, el.note_id)}
                >
                  Erase
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default memo(Note);
