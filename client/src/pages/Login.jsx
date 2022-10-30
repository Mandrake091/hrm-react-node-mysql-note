import React, { useState } from "react";
import Nav from "../components/Nav";
function Login() {
  
  //state management for take pass, user and set type of message and alert message
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("danger");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ opacity: "0" });

  //function for displaying alert and redirection to other page
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

  //function for submit form and login
  const submit = (e) => {
    e.preventDefault();

    if (user.length < 3 || user.length < 3) {
      return sendMessage("Inserisci i dati correttamente!");
    } else {
      fetch("/api/login/", {
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
        <div className="inside">Hello</div>
      </div>

      <div className={`alert mt-5 alert-${type}`} style={alert} role="alert">
        {message}
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h2>Login</h2>
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="user" className="form-label">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setUser(e.currentTarget.value)}
                      type="email"
                      className="form-control"
                      id="user"
                      aria-describedby="emailHelp"
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pass" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(e) => setPass(e.currentTarget.value)}
                      type="password"
                      className="form-control"
                      id="pass"
                    />
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

export default Login;
