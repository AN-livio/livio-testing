import { useHistory } from "react-router";
import { useState } from "react";

let OtpCheck = ({ otp, setOtp, setTest, setUser }) => {
  let [userOtp, setUserOtp] = useState("");
  let history = useHistory();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-4">
            <h1 style={{ textAlign: "center" }}>Email Verification</h1>
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (userOtp == otp) {
                  history.push("/test");
                } else {
                  setUser(null);
                  setTest(null);
                  setOtp(null);
                  alert("You've entered the wrong security code")
                  history.push("/");
                }
              }}
            >
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Security Code"
                  className="form-control"
                  id="name"
                  value={userOtp}
                  onChange={(e) => {
                    setUserOtp(e.currentTarget.value);
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary "
                style={{ width: "100%" }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpCheck;
