import { useHistory } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import "./candidate-dashboard.css";
let CandidateDashboard = () => {
  let history = useHistory();

  let [candidates, setCandidates] = useState([]);
  let [jobTitle, setJobTitle] = useState("");
  let [degree, setDegree] = useState("");
  let [workingStatus, setWorkingStatus] = useState("");
  let [yoe, setYoe] = useState("");
  let [marks, setMarks] = useState("");
  let [sortBy, setSortBy] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [currPage, setCurrPage] = useState(1);
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!token) history.push("/adminlogin");
    else {
      axios
        .get("https://livioscreeningapi.herokuapp.com/admin/getallcandidates", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCandidates(response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  let renderedCandidates = candidates.map((el) => {
    let tScore = 0;
    for (let x in el.individualScore) {
      tScore += Number(el.individualScore[x]) * (Number(x) + 1);
    }

    el.totalScore = tScore;

    if (el.lastTestDate) {
      el.lastTestDate = el.lastTestDate
        .toLocaleString("en-US", {
          timeZone: "Asia/Calcutta",
        })
        .split("T")[0];
    } else {
      el.lastTestDate = "NA";
    }
    return el;
  });

  let jobTitles = Array.from(
    new Set([...renderedCandidates.map((el) => el.appliedFor), "NA"])
  );

  renderedCandidates = renderedCandidates.filter((el) => {
    if (marks) return el.totalScore >= Number(marks);
    else return true;
  });

  renderedCandidates = renderedCandidates.filter((el) => {
    if (jobTitle) return el.appliedFor == jobTitle;
    else return true;
  });

  renderedCandidates = renderedCandidates.filter((el) => {
    if (degree) return el.highestDegree == degree;
    else return true;
  });

  renderedCandidates = renderedCandidates.filter((el) => {
    if (workingStatus) return el.workStatus == workingStatus;
    else return true;
  });

  renderedCandidates = renderedCandidates.filter((el) => {
    if (yoe) return el.exp == yoe;
    else return true;
  });

  renderedCandidates = renderedCandidates.filter((el) => {
    if (startDate) {
      return dateCompare(startDate, el.lastTestDate);
    } else return true;
  });

  renderedCandidates = renderedCandidates.filter((el) => {
    if (endDate) {
      return dateCompare(el.lastTestDate, endDate);
    } else return true;
  });

  let totalPages = Math.ceil(renderedCandidates.length / 10);

  let experienceKeys = {
    "Less than 1 year": 1,
    "1 Year": 2,
    "2 or more years": 3,
    "3 or more years": 4,
    "5 or more years": 5,
    NA: 0,
  };

  if (sortBy == 1) {
    renderedCandidates.sort((a, b) => {
      return Number(b.totalScore) - Number(a.totalScore);
    });
  } else if (sortBy == 2) {
    renderedCandidates.sort((a, b) => {
      return Number(a.totalScore) - Number(b.totalScore);
    });
  } else if (sortBy == 3) {
    renderedCandidates.sort((a, b) => {
      return experienceKeys[b.exp] - experienceKeys[a.exp];
    });
  } else if (sortBy == 4) {
    renderedCandidates.sort((a, b) => {
      return experienceKeys[a.exp] - experienceKeys[b.exp];
    });
  } else if (sortBy == 5) {
    renderedCandidates.sort((a, b) => {
      if (dateCompare(a.lastTestDate, b.lastTestDate)) return 1;
      else return -1;
    });
  } else if (sortBy == 6) {
    renderedCandidates.sort((a, b) => {
      if (dateCompare(a.lastTestDate, b.lastTestDate)) return -1;
      else return 1;
    });
  }

  renderedCandidates = renderedCandidates.slice(
    (currPage - 1) * 10,
    currPage * 10
  );

  // in filter empty string means all categories, remember NA is itself a different category
  // if something does not exist its empty string, because NA is used as a category for before features people
  return (
    <>
      <div className="row filter-row-1">
        <div className="col-5 col-sm-5 col-md-3	col-lg-2 filter-parent">
          <select
            value={jobTitle}
            className="form-select"
            onChange={(e) => {
              setJobTitle(e.currentTarget.value);
              setCurrPage(1);
            }}
          >
            <option value="" selected>
              Select Job Title
            </option>
            {jobTitles.map((el) => (
              <option value={el}>{el}</option>
            ))}
          </select>
        </div>
        <div className="col-5 col-sm-5 col-md-3	col-lg-2 filter-parent">
          <select
            className="form-select"
            value={degree}
            onChange={(e) => {
              setDegree(e.currentTarget.value);
              setCurrPage(1);
            }}
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
            <option value="Post-Doc">Post-Doc</option>
            <option value="NA">NA</option>
          </select>
        </div>
        <div className="col-5 col-sm-5 col-md-3	col-lg-2 filter-parent">
          <select
            className="form-select"
            value={workingStatus}
            onChange={(e) => {
              setWorkingStatus(e.currentTarget.value);
              setCurrPage(1);
            }}
          >
            <option value="">Working Status</option>
            <option value="Currently working">Currently working</option>
            <option value="Currently not working">Currently not working</option>
            <option value="Serving notice period">Serving notice period</option>
            <option value="NA">NA</option>
          </select>
        </div>
        <div className="col-5 col-sm-5 col-md-3	col-lg-2 filter-parent">
          <select
            className="form-select"
            value={yoe}
            onChange={(e) => {
              setYoe(e.currentTarget.value);
              setCurrPage(1);
            }}
          >
            <option value="">Years of Experience</option>
            <option value="Less than 1 year">Less than 1 Year</option>
            <option value="1 Year">1 Year</option>
            <option value="2 or more years">2+ Years</option>
            <option value="3 or more years">3+ Years</option>
            <option value="5 or more years">5+ Years</option>
            <option value="NA">NA</option>
          </select>
        </div>
        <div className="col-5 col-sm-5 col-md-3	col-lg-2 filter-parent">
          <input
            type="number"
            placeholder="Marks"
            className="form-control"
            value={marks}
            onChange={(e) => {
              setMarks(e.currentTarget.value);
              setCurrPage(1);
            }}
            max={30}
            min={0}
          />
        </div>

        {
          // empty string in sort means don't sort
        }
        <div className="col-5 col-sm-5 col-md-4	col-lg-2 filter-parent">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.currentTarget.value)}
          >
            <option value="">Sort By</option>
            <option value="1">Marks (High to Low)</option>
            <option value="2">Marks (Low to High)</option>
            <option value="3">Experience (High to Low)</option>
            <option value="4">Experience (Low to High)</option>
            <option value="5">Date applied (High to Low)</option>
            <option value="6">Date applied (Low to High)</option>
          </select>
        </div>
      </div>
      <div className="row filter-row-2">
        <div className="col-5 col-sm-5 col-md-4	col-lg-2 filter-parent">
          <label htmlFor="start-date">Test Given on or After</label>
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            id="start-date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.currentTarget.value);
              setCurrPage(1);
            }}
          />
        </div>
        <div className="col-5 col-sm-5 col-md-4	col-lg-2 filter-parent">
          <label htmlFor="end-date">Test Given on or Before</label>
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            id="end-date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.currentTarget.value);
              setCurrPage(1);
            }}
          />
        </div>
        <div
          className="col-5 col-sm-5 col-md-4	col-lg-2 filter-parent"
          style={{ position: "relative", height: "4rem" }}
        >
          <button
            className="btn btn-primary clear-date"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setCurrPage(1);
            }}
          >
            Clear dates
          </button>
        </div>
      </div>
      <div className="table-responsive" style={{ padding: "0 4rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">College</th>
              <th scope="col">Marks</th>
              <th scope="col">Applied for</th>
              <th scope="col">Highest Degree</th>
              <th scope="col">Experience</th>
              <th scope="col">Working Status</th>
              <th scope="col">Resume</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {renderedCandidates.map((e, index) => (
              <tr key={`key${index + 1}`}>
                <th scope="row">{index + 1}</th>
                <td>{emptyCheck(e.name)}</td>
                <td>{emptyCheck(e.college)}</td>
                <td>{emptyCheck(e.totalScore) ? e.totalScore : 0}</td>
                <td>{emptyCheck(e.appliedFor)}</td>
                <td>{emptyCheck(e.highestDegree)}</td>
                <td>{emptyCheck(e.exp)}</td>
                <td>{emptyCheck(e.workStatus)}</td>
                <td>
                  {e.resumeURL && e.resumeURL != "NA" ? (
                    <a href={e.resumeURL}>Link</a>
                  ) : (
                    ""
                  )}
                </td>
                <td>{emptyCheck(e.phone)}</td>
                <td>{e.email && e.email != "NA" ? e.email : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul class="pagination candidate-pagination">
          <li
            class="page-item active"
            onClick={() => {
              if (currPage > 1) setCurrPage(currPage - 1);
            }}
          >
            <a class="page-link">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link">Current Page - {currPage}</a>
          </li>
          <li
            class="page-item active"
            onClick={() => {
              if (currPage < totalPages) setCurrPage(currPage + 1);
            }}
          >
            <a class="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

let dateCompare = (date1, date2) => {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  return d1 <= d2;
};

let emptyCheck = (value) => (value ? value : "");

export default CandidateDashboard;
