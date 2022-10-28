import React, { useState } from "react";
import Nav from "../components/Nav";
import CreateNote from "../components/CreateNote";
import ShowNotes from "../components/ShowNotes";
import { createContext } from "react";

export const userContext = createContext();

function Home() {
  const [type, setType] = useState("danger");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ opacity: "0" });
  const [noteUpdate, setNoteUpdate] = useState(0);
  return (
    <>
      <Nav />
      <div className={`alert mt-3 alert-${type}`} style={alert} role="alert">
        {message}
      </div>
      <div className="font">
        <div className="inside">Notes</div>
      </div>

      <div className="container">
        <userContext.Provider
          value={{ setType, setMessage, setAlert, setNoteUpdate, noteUpdate }}
        >
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6">
              <CreateNote />
            </div>
          </div>

          <ShowNotes />
        </userContext.Provider>
      </div>
    </>
  );
}

export default Home;
