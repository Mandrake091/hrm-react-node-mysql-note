import React, { useState } from "react";
import Nav from "../components/Nav";
function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("danger");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ opacity: "0" });

  const sendMessage = (text, type = "danger", time = 2) => {
    setType(type);
    setMessage(text);
    setAlert({ opacity: "1" });
    setTimeout(() => {
      setAlert({ opacity: "0" });
      if (type === "success") {
        document.location.replace("/login");
      }
    }, time * 1000);
  };
  //function for submit form
  const submit = (e) => {
    e.preventDefault();
    if (user.length < 0 || pass.length < 0)
      return sendMessage("Inserisci i dati correttamente!");
    else {
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ user, pass }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) sendMessage(data.message, "success");
          else sendMessage(data.message);
        });
    }
  };

  return (
    <>
      <Nav />
      <div className="font">
        <div className="inside" style={{ fontSize: "1.2em" }}>
          Sign
        </div>
      </div>
      <div className={`alert mt-5 alert-${type}`} style={alert} role="alert">
        {message}
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h2>Register</h2>
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setUser(e.currentTarget.value)}
                      type="user"
                      className="form-control"
                      id="user"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="psw" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(e) => setPass(e.currentTarget.value)}
                      type="pass"
                      className="form-control"
                      id="pass"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="check">
                      Check me out
                    </label>
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
        </div>
      </div>
    </>
  );
}

export default Register;
