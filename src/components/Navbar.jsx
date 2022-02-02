import { Link } from "react-router-dom";
let Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          LIVIO Screening
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <Link
            to="/adminlogin"
            style={{ color: "#ffffff8c", textDecoration: "none" }}
          >
            <span className="navbar-text">Admin</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
