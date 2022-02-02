import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

let ViewQuestion = () => {
  let query = useQuery();
  let history = useHistory();
  let [question, setQuestion] = useState({});

  let getQuestionReq = (id) => {
    let token = sessionStorage.getItem("token");
    axios
      .get("https://livioscreeningapi.herokuapp.com/admin/getq?id=" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setQuestion(response.data.question);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let genImgUrl = (copiedUrl) => {
    copiedUrl = copiedUrl.trim();
    if (copiedUrl) {
      let intermediate = copiedUrl.split("https://drive.google.com/file/d/")[1];
      if (intermediate) {
        let id = intermediate.split("/view")[0];
        return "https://drive.google.com/uc?export=view&id=" + id;
      }
    }
    return "";
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!token) history.push("/adminlogin");

    if (query.get("id")) {
      getQuestionReq(query.get("id"));
    } else {
      history.push("/adminquestions");
    }
  }, []);
  return (
    <>
      {question.levelTag && question.answerOption ? (
        <>
          <div className="container">
            <h3>{question.question}</h3>
            <p>({`Level - ${question.levelTag.replace("level", "")}`})</p>
            {question.questionImg ? (
              <>
                <img src={genImgUrl(question.questionImg)} />
              </>
            ) : (
              ""
            )}
            <h4>Options:</h4>
            {["a", "b", "c", "d"].map((el) => {
              if (question[`${el}Img`]) {
                return <img src={genImgUrl(question[`${el}Img`])} />;
              } else {
                return (
                  <p>
                    {el}) {question["option" + el.toUpperCase()]}{" "}
                  </p>
                );
              }
            })}
            <h4>
              Answer- {`Option ${question.answerOption.replace("option", "")}`}
            </h4>
            <button
              className="btn btn-primary"
              onClick={() => {
                history.push("/adminquestions");
              }}
            >
              Back
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

let useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default ViewQuestion;
