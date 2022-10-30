import React from "react";
import Note from "./Note";

function ShowNotes() {
  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-body">
          <div className="row justify-content-evenly g-3">
            <Note />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowNotes;
