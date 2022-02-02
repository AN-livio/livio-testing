import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useHistory } from "react-router";

let AdminLogin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (sessionStorage.getItem("token")) history.push("/adminoptions");
  }, []);
  return (
    <>
      {!loading ? (
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4 mt-4">
              <h1 className="mt-4 mb-4" style={{ textAlign: "center" }}>
                Admin login
              </h1>
              <form
                className="mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  axios
                    .post(
                      "https://livioscreeningapi.herokuapp.com/admin/login",
                      {
                        email,
                        password,
                      }
                    )
                    .then((response) => {
                      sessionStorage.setItem("token", response.data.token);
                      setLoading(false);
                      history.push("/adminoptions");
                    })
                    .catch((error) => {
                      console.log(error);
                      setLoading(false);
                    });
                }}
              >
                <div className="mb-3">
                  <input
                    placeholder="Email Address"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary "
                  style={{ width: "100%" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AdminLogin;
