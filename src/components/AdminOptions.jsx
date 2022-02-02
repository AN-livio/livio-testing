import { useHistory } from "react-router";
import axios from "axios";
import { useEffect } from "react";
let AdminOptions = () => {
  let history = useHistory();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!token) history.push("/adminlogin");
  }, []);

  return (
    <>
      <button
        className="btn btn-primary m-4"
        onClick={() => {
          let token = sessionStorage.getItem("token");
          axios
            .get("https://livioscreeningapi.herokuapp.com/admin/getcsv", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "results.csv"); 
              link.click();
            })
            .catch((error) => {
              alert("Error");
              console.log(error);
            });
        }}
      >
        Download Results
      </button>
      <br />
      <button
        className="btn btn-primary m-4"
        onClick={() => {
          history.push("/adminquestions");
        }}
      >
        All Questions
      </button>
      <br />
      <button
        className="btn btn-primary m-4"
        onClick={() => {
          history.push("/adminadd");
        }}
      >
        Add Question
      </button>
      <br />
      <button
        className="btn btn-primary m-4"
        onClick={() => {
          history.push("/candidatedashboard");
        }}
      >
        Candidate Dashboard
      </button>
      <br />
      <button
        className="btn btn-primary m-4"
        onClick={() => {
          let token = sessionStorage.getItem("token");
          axios
            .post(
              "https://livioscreeningapi.herokuapp.com/admin/logout",
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then(() => {
              sessionStorage.clear();
              history.push("/adminlogin");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        logout
      </button>
    </>
  );
};

export default AdminOptions;
