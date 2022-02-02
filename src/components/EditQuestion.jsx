import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

let EditQuestion = () => {
  let history = useHistory();
  let query = useQuery();

  let [question, setQues] = useState("");
  let [questionImg, setQImg] = useState("");
  let [optionA, setOpA] = useState("");
  let [optionB, setOpB] = useState("");
  let [optionC, setOpC] = useState("");
  let [optionD, setOpD] = useState("");
  let [aImg, setAImg] = useState(false);
  let [bImg, setBImg] = useState(false);
  let [cImg, setCImg] = useState(false);
  let [dImg, setDImg] = useState(false);
  let [level, setLevel] = useState("");
  let [answerOption, setAns] = useState("");

  let getQuestionReq = (id) => {
    let token = sessionStorage.getItem("token");
    axios
      .get("https://livioscreeningapi.herokuapp.com/admin/getq?id=" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setQues(response.data.question.question);
        setQImg(response.data.question.questionImg);
        setOpA(response.data.question.optionA);
        setOpB(response.data.question.optionB);
        setOpC(response.data.question.optionC);
        setOpD(response.data.question.optionD);
        setAImg(response.data.question.aImg);
        setBImg(response.data.question.bImg);
        setCImg(response.data.question.cImg);
        setDImg(response.data.question.dImg);
        setLevel(response.data.question.levelTag);
        setAns(response.data.question.answerOption);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="container">
        <h1>Edit Question</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            let token = sessionStorage.getItem("token");
            let data = {
              question: question,
              optionA: optionA,
              aImg: aImg,
              optionB: optionB,
              bImg: bImg,
              optionC: optionC,
              cImg: cImg,
              optionD: optionD,
              dImg: dImg,
              answerOption: answerOption,
              levelTag: level,
            };

            if (questionImg) {
              data["questionImg"] = questionImg;
            }

            axios
              .post("https://livioscreeningapi.herokuapp.com/admin/modifyquestion", data, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => {
                alert("question modified");
                history.push("/adminquestions")
              })
              .catch((error) => {
                console.log(error);
                alert("Error");
              });
          }}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={question}
              onChange={(e) => {
                setQues(e.currentTarget.value);
              }}
              placeholder="Question"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={questionImg}
              onChange={(e) => {
                setQImg(e.currentTarget.value);
              }}
              className="form-control"
              placeholder="Question Image URL"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={optionA}
              onChange={(e) => {
                setOpA(e.currentTarget.value);
              }}
              className="form-control"
              placeholder="Option A"
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              checked={aImg}
              onChange={() => {
                setAImg(!aImg);
              }}
              type="checkbox"
              id="optionA"
            />
            <label className="form-check-label" htmlFor="optionA">
              Option A is image
            </label>
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={optionB}
              onChange={(e) => {
                setOpB(e.currentTarget.value);
              }}
              className="form-control"
              placeholder="Option B"
            />
          </div>
          <div className="form-check mb-3">
            <input
              checked={bImg}
              onChange={() => {
                setBImg(!bImg);
              }}
              className="form-check-input"
              type="checkbox"
              id="optionB"
            />
            <label className="form-check-label" htmlFor="optionB">
              Option B is image
            </label>
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={optionC}
              onChange={(e) => {
                setOpC(e.currentTarget.value);
              }}
              className="form-control"
              placeholder="Option C"
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              checked={cImg}
              onChange={() => {
                setCImg(!cImg);
              }}
              type="checkbox"
              id="optionC"
            />
            <label className="form-check-label" htmlFor="optionC">
              Option C is image
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={optionD}
              onChange={(e) => {
                setOpD(e.currentTarget.value);
              }}
              className="form-control"
              placeholder="Option D"
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              checked={dImg}
              onChange={() => {
                setDImg(!dImg);
              }}
              type="checkbox"
              id="optionD"
            />
            <label className="form-check-label" htmlFor="optionD">
              Option D is image
            </label>
          </div>
          <select
            className="form-select mb-3"
            value={level}
            onChange={(e) => {
              setLevel(e.currentTarget.value);
            }}
          >
            <option value="level1">Level: level 1</option>
            <option value="level2">Level: level 2</option>
            <option value="level3">Level: level 3</option>
            <option value="level4">Level: level 4</option>
            <option value="level5">Level: level 5</option>
          </select>
          <select
            className="form-select mb-3"
            value={answerOption}
            onChange={(e) => {
              setAns(e.currentTarget.value);
            }}
          >
            <option value="optionA">Answer is option A</option>
            <option value="optionB">Answer is option B</option>
            <option value="optionC">Answer is option C</option>
            <option value="optionD">Answer is option D</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <br />
          <br />
          <button
              className="btn btn-primary"
              onClick={() => {
                history.push("/adminquestions");
              }}
            >
              Back
            </button>
        </form>
      </div>
    </>
  );
};

let useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default EditQuestion;
