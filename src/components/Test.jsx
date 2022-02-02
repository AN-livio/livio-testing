import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Option from "./Option";

let msToTime = (duration) => {
  let seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};

let Test = ({ test, testScore, setTestScore }) => {
  let [qNo, setQNo] = useState(1);
  let [timeLeft, setTimeLeft] = useState(15 * 60 * 1000);

  let options = ["a", "b", "c", "d"];
  let [selectedOption, setSelectedOption] = useState(false);
  let [warningLeft, setWarningLeft] = useState(3);
  let history = useHistory();
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

  const onBlur = () => {
    if (warningLeft > 0) {
      alert(
        "Click outside test area detected! After " +
          warningLeft +
          " clicks, your test will be automatically submitted"
      );
    }
    setWarningLeft(warningLeft - 1);
    if (warningLeft <= 0) {
      history.push("/userscore");
    }
  };

  useEffect(() => {
    setTestScore({
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  });

  useEffect(() => {
    let id = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1000);
      } else {
        history.push("/userscore");
      }
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [timeLeft]);

  return (
    <>
      {qNo > 10 ? (
        <Redirect to="/userscore" />
      ) : (
        <>
          {test ? (
            <div className="container p-4">
              <p>{msToTime(timeLeft)}</p>
              <h2>
                Q{qNo}- {test[qNo - 1].question}
              </h2>
              {test[qNo - 1].questionImg ? (
                <img
                  style={{
                    height: "45vh",
                    width: "80vw",
                    objectFit: "contain",
                  }}
                  src={genImgUrl(test[qNo - 1].questionImg)}
                  alt="question"
                />
              ) : (
                ""
              )}
              <div className="mt-4">
                {options.map((el) => (
                  <Option
                    key={el}
                    question={test[qNo - 1]}
                    alpha={el}
                    setTestScore={setTestScore}
                    testScore={testScore}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                ))}
              </div>
              <button
                className="btn btn-primary mt-4 mb-4"
                onClick={() => {
                  let level = test[qNo - 1].levelTag;
                  let newScore = { ...testScore };
                  if (test[qNo - 1].answerOption === selectedOption) {
                    newScore[level] = testScore[level] + 1;
                  }
                  setTestScore(newScore);
                  setSelectedOption(false);

                  setQNo(qNo + 1);
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <Redirect to="/" />
          )}
        </>
      )}
    </>
  );
};

export default Test;
