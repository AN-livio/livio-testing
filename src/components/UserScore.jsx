import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

let validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

let UserScore = ({ user, testScore, hiringManagerEmail, jobPost }) => {
  let [submitted, setSubmitted] = useState(false);
  let [resume, setResume] = useState(null);
  let [uploadURL, setUploadURL] = useState("");
  let [uploading, setUploading] = useState(false);
  let [uploaded, setUploaded] = useState(false);
  useEffect(() => {
    let totalScore = 0;
    let formattedScoreForApi = [];
    for (let x in testScore) {
      totalScore += testScore[x];
    }
    for (let i = 1; i <= 5; i++) {
      formattedScoreForApi[i - 1] = testScore[`level${i}`];
    }

    let dataToBeSent = {
      email: user.email,
      individualScore: formattedScoreForApi,
      totalScore,
      jobPost
    };

    if (hiringManagerEmail && validateEmail(hiringManagerEmail)) {
      dataToBeSent.hiringManagerEmail = hiringManagerEmail;
    }

    console.log(dataToBeSent);

    axios
      .post(
        "https://livioscreeningapi.herokuapp.com/screening/submit",
        dataToBeSent
      )
      .then((res) => {
        setUploadURL(res.data.url);
        setSubmitted(true);
      })
      .catch((error) => {
        alert("Error!");
        console.log(error);
      });
  }, []);
  return (
    <>
      {user ? (
        <div className="container p-4">
          <h5>{user.name}</h5>
          <h5>{user.email}</h5>
          <hr />
          {submitted ? (
            <>
              <h2>
                {uploading && !uploaded
                  ? "Your resume is being uploaded..."
                  : ""}
                {!uploading && uploaded
                  ? "Thank you for applying to Livio."
                  : ""}

                {!uploaded && !uploading
                  ? "Please upload your resume below for futher process."
                  : ""}
              </h2>
              {!uploaded && !uploading ? (
                <>
                  <div className="row">
                    <div className="col-4">
                      <div class="mb-3 mt-3">
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => {
                            let file = e.currentTarget.files[0];
                            let fileType = file.type.split("/")[1];
                            let fileSizeInMb = (
                              file.size /
                              (1024 * 1024)
                            ).toFixed(2);
                            if (fileSizeInMb > 1) {
                              alert("Error: File size exceeds 1 mb");
                              e.currentTarget.value = null;
                              setResume(null);
                            } else if (fileType != "pdf") {
                              alert("Error: File is not a pdf");
                              e.currentTarget.value = null;
                              setResume(null);
                            } else {
                              setResume(file);
                            }
                          }}
                        />
                        <button
                          onClick={async () => {
                            if (resume && uploadURL && !uploaded) {
                              setUploading(true);
                              await fetch(uploadURL, {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                                body: resume,
                              });
                              setUploading(false);
                              setUploaded(true);
                              console.log(uploadURL);
                              const resumeURL = uploadURL.split("?")[0];
                              console.log(resumeURL);
                              let { name, email } = user;

                              axios
                                .post(
                                  "https://livioscreeningapi.herokuapp.com/screening/resume",
                                  {
                                    name,
                                    email,
                                    resumeURL,
                                    hiringManagerEmail,
                                  }
                                )
                                .then(() => {
                                  console.log("resume uploaded");
                                })
                                .catch((error) => {
                                  alert("Error!");
                                  console.log(error);
                                });
                            }
                          }}
                          className="btn btn-primary mt-3"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <h2>Please wait while we submit your test.</h2>
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default UserScore;
