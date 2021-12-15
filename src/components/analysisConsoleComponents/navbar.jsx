import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/compat/app";

class NavBar extends Component {
  render() {
    return (
      <section className="">
        <div className="container">
          <header className="d-flex justify-content-center py-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center mb-3 me-md-auto text-dark text-decoration-none"
            >
              <svg className="bi me-2" width={40} height={32}>
                <use xlinkHref="#bootstrap" />
              </svg>
              <span className="fs-4">Analysis Console</span>
            </a>

            <span className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome {firebase.auth().currentUser.email}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => firebase.auth().signOut()}
                    href="/login"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </span>
          </header>
        </div>
      </section>
    );
  }
}

export default NavBar;
