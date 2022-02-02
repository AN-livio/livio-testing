import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
let AllQuestions = () => {
  let [questions, setQuestions] = useState([]);
  let history = useHistory();
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!token) history.push("/adminlogin");
    getQuestionsReq();
  }, []);
  let getQuestionsReq = () => {
    let token = sessionStorage.getItem("token");
    axios
      .get("https://livioscreeningapi.herokuapp.com/admin/getquestions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-8 offset-2">
          <h1>All Questions</h1>
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Level</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {questions.map((el, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.question}</td>
                  <td>{el.levelTag}</td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={() => {
                        let token = sessionStorage.getItem("token");
                        axios
                          .post(
                            "https://livioscreeningapi.herokuapp.com/aAll",
                            {
                              _id: el._id,
                            },
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then(() => {
                            getQuestionsReq();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={() => {
                        history.push("/adminviewquestion?id=" + el._id);
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={() => {
                        history.push("/admineditquestion?id=" + el._id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllQuestions;
