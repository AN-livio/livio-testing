import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

let AddQuestion = () => {
  let history = useHistory();

 

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!token) history.push("/adminlogin");
  }, []);

  let [ques, setQues] = useState("");
  let [qImg, setQImg] = useState("");
  let [opA, setOpA] = useState("");
  let [opB, setOpB] = useState("");
  let [opC, setOpC] = useState("");
  let [opD, setOpD] = useState("");
  let [aImg, setAImg] = useState(false);
  let [bImg, setBImg] = useState(false);
  let [cImg, setCImg] = useState(false);
  let [dImg, setDImg] = useState(false);
  let [level, setLevel] = useState("level1");
  let [ans, setAns] = useState("optionA");

  return (
    <>
      <div className="container">
        <h1>Add New Question</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            let token = sessionStorage.getItem("token");
            let data = {
              question: ques,
              optionA: opA,
              aImg: aImg,
              optionB: opB,
              bImg: bImg,
              optionC: opC,
              cImg: cImg,
              optionD: opD,
              dImg: dImg,
              answerOption: ans,
              levelTag: level,
            };

            if (qImg) {
              data["questionImg"] = qImg;
            }

            axios
              .post(
                "https://livioscreeningapi.herokuapp.com/admin/addquestion",
                data,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((res) => {
                //added
                console.log(res);
                alert("question added");
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
              value={ques}
              onChange={(e) => {
                setQues(e.currentTarget.value);
              }}
              placeholder="Question"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={qImg}
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
              value={opA}
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
              value={opB}
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
              value={opC}
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
              value={opD}
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
            value={ans}
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
        </form>
      </div>
    </>
  );
};

export default AddQuestion;
