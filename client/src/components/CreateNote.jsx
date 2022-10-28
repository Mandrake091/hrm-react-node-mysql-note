import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { userContext } from "../pages/Home";
function CreateNote() {
  const { setType, setMessage, setAlert, setNoteUpdate } =
    useContext(userContext);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const sendMessage = (text, type = "danger", time = 2) => {
    setType(type);
    setMessage(text);
    setAlert({ opacity: "1" });
    setTimeout(() => {
      setAlert({ opacity: "0" });
      if (type === "success") {
        document.location.replace("/");
      }
    }, time * 1000);
  };
  const submit = (e) => {
    e.preventDefault();
    if (title.length < 3 || note.length < 3)
      return sendMessage("Please fill details correctly");
    fetch("/api/createNote", {
      method: "POST",
      body: JSON.stringify({ title, note }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {sendMessage(data.message, "success"); setNoteUpdate(prev => prev +1)} 
        else sendMessage(data.message);
      });
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body">
          <h4>Create new note</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                note={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                type="text"
                className="form-control"
                id="title"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="note" className="form-label">
                Note
              </label>
              <textarea
                value={note}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => setNote(e.currentTarget.value)}
              ></textarea>
            </div>
            <button
              onClick={(e) => submit(e)}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
