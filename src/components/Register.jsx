import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useHistory, useLocation } from "react-router";

let useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

let Register = ({
  setTest,
  setUser,
  setHiringManagerEmail,
  setOtp,
  setJobPost,
}) => {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [college, setCollege] = useState("");
  let [phone, setPhone] = useState("");
  let [highestDegree, setHighestDegree] = useState("NA");
  let [workStatus, setWorkingStatus] = useState("NA");
  let [exp, setExp] = useState("NA");
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  let query = useQuery();

  //make the fields required

  useEffect(() => {
    if (query.get("email")) {
      setHiringManagerEmail(query.get("email"));
    }

    if (query.get("job")) {
      setJobPost(query.get("job"));
    }
  }, []);

  return (
    <>
      {!loading ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-4">
              <h1 className="mb-4" style={{ textAlign: "center" }}>
                Instructions
              </h1>
              <ol>
                <li>
                  This is the first step to apply for a job at Livio Building
                  Systems. Fill your required details.
                </li>
                <li>
                  After providing the required details, click on{" "}
                  <b>Start Test</b>. A security code will be sent to your given
                  email to verify the email. Enter the code, this will begin a
                  puzzle test which will contain 10 questions. You'll have 15
                  minutes to complete it. If you enter the wrong security code
                  you'll be taken back to starting screen.
                </li>
                <li>
                  Remember you'll not be able to go back to previous question
                  once you skip it.
                </li>
                <li>
                  Once you've completed the test you'll be taken to{" "}
                  <b>Thank you </b>
                  screen and our HR and hiring manager will receive your test
                  score and the details provided by you.
                </li>
              </ol>
              <hr />
              <h4>Note:</h4>
              <ol>
                <li>Do not try to click outside the browser window.</li>
                <li>Do not use keyboard shortcuts.</li>
                <li>
                  Your test will be automatically submitted if you click outside
                  the browser more than 3 times.
                </li>
              </ol>
              <ul></ul>
            </div>
            <div className="col-md-4 offset-md-2 mt-4">
              <h1 style={{ textAlign: "center" }}>Start Your Application</h1>
              <form
                className="mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  axios
                    .post(
                      "https://livioscreeningapi.herokuapp.com/screening/new",
                      {
                        email,
                        phone,
                        college,
                        name,
                        exp,
                        workStatus,
                        highestDegree,
                      }
                    )
                    .then((response) => {
                      let { user, test, otp } = response.data;
                      setLoading(false);
                      if (!response.data.test) {
                        history.push("/waitlist");
                      } else {
                        setUser(user);
                        setTest(test);
                        setOtp(otp);
                        history.push("/otp");
                      }
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert("Please fill all the required details");
                      history.push("/");
                      console.log(error);
                    });
                }}
              >
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Email Address"
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Phone Number"
                    type="number"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.currentTarget.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="College (Optional)"
                    className="form-control"
                    id="college"
                    value={college}
                    onChange={(e) => {
                      setCollege(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    onChange={(e) => setHighestDegree(e.currentTarget.value)}
                    defaultValue={"NA"}
                    value={highestDegree}
                  >
                    <option value={"NA"}>Select Your Highest Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Post-Doc">Post-Doc</option>
                  </select>
                </div>

                <div className="mb-3">
                  <select
                    className="form-select"
                    onChange={(e) => setWorkingStatus(e.currentTarget.value)}
                    defaultValue={"NA"}
                    value={workStatus}
                  >
                    <option value={"NA"}>Select Your Working Status</option>
                    <option value="Currently working">Currently working</option>
                    <option value="Currently not working">
                      Currently not working
                    </option>
                    <option value="Serving notice period">
                      Serving notice period
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <select
                    className="form-select"
                    onChange={(e) => setExp(e.currentTarget.value)}
                    defaultValue={"NA"}
                    value={exp}
                  >
                    <option value={"NA"}>Years of Experience</option>
                    <option value="Less than 1 year">Less than 1 Year</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 or more years">2+ Years</option>
                    <option value="3 or more years">3+ Years</option>
                    <option value="5 or more years">5+ Years</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary "
                  style={{ width: "100%" }}
                >
                  Start Test
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

export default Register;
