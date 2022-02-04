import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserScore from "./components/UserScore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Adminlogin from "./components/AdminLogin";
import { useState } from "react";
import Test from "./components/Test";
import AdminOptions from "./components/AdminOptions";
import EditQuestion from "./components/EditQuestion";
import ViewQuestion from "./components/ViewQuestion";
import AllQuestions from "./components/AllQuestions";
import AddQuestion from "./components/AddQuestion";
import OtpCheck from "./components/OtpCheck";
import CandidateDashboard from "./components/CandidateDashboard";
import Waitlist from "./components/WaitList";
let App = () => {
  let [user, setUser] = useState(null);
  let [test, setTest] = useState(null);
  let [otp, setOtp] = useState(null);
  let [testScore, setTestScore] = useState({
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  });
  let [hiringManagerEmail, setHiringManagerEmail] = useState(null);
  let [jobPost, setJobPost] = useState("");

  return (
    <>
      <Router>
        <Switch>
          <Route path="/adminlogin">
            <Navbar />
            <Adminlogin />
          </Route>
          <Route path="/adminoptions">
            <Navbar />
            <AdminOptions />
          </Route>
          <Route path="/adminadd">
            <Navbar />
            <AddQuestion />
          </Route>
          <Route path="/adminquestions">
            <Navbar />
            <AllQuestions />
          </Route>
          <Route path="/adminviewquestion">
            <Navbar />
            <ViewQuestion />
          </Route>
          <Route path="/admineditquestion">
            <Navbar />
            <EditQuestion />
          </Route>
          <Route path="/adminscore">
            <Navbar />
          </Route>
          <Route path="/candidatedashboard">
            <Navbar />
            <CandidateDashboard />
          </Route>
          <Route path="/test">
            <Test
              test={test}
              testScore={testScore}
              user={user}
              setTestScore={setTestScore}
            />
          </Route>
          <Route path="/userscore">
            <Navbar />
            <UserScore
              user={user}
              testScore={testScore}
              jobPost={jobPost}
              hiringManagerEmail={hiringManagerEmail}
            />
          </Route>
          <Route path="/otp">
            <Navbar />
            <OtpCheck
              otp={otp}
              setUser={setUser}
              setTest={setTest}
              setOtp={setOtp}
            />
          </Route>
          <Route path="/waitlist">
            <Navbar />
            <Waitlist />
          </Route>
          <Route path="/">
            <Navbar />
            <Register
              setJobPost={setJobPost}
              setHiringManagerEmail={setHiringManagerEmail}
              setUser={setUser}
              setTest={setTest}
              setOtp={setOtp}
              jobPost={jobPost}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
