import React, { memo, useEffect, useContext, useState } from "react";
import { userContext } from "../pages/Home";

function Note() {

  //i use the context for update the notes

  const { setNoteUpdate } = useContext(userContext);

  //state management for array of notes
  //this is called every time the notes are updated

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/getNotes/")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setData(data.message);
      });
  }, [setNoteUpdate]);
  console.log(data);
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
      {data.length === 0 ? (
        <div>
          <h1>Hello.</h1>
          <p>No notes here, please create new one.</p>
        </div>
      ) : (
        data.map((el) => (
          <div
            className="card note"
            key={el.note_id}
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                {el.title.charAt(0).toUpperCase() + el.title.slice(1)}
              </h5>
              <h6
                className="card-subtitle mb-2 text-muted"
                style={{ fontSize: "0.9rem" }}
              >
                {el.date}
              </h6>
              <p className="card-text">
                {el.note.charAt(0).toUpperCase() + el.note.slice(1)}
              </p>
              <div className="row justify-content-end">
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
