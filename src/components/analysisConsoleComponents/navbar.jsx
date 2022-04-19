import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pneunostics from "../../resources/images/Pneunostic-Logo.svg";
import ToggleButton from "react-bootstrap/ToggleButton";
import { SignOut } from "../signIn";

import { ModalUploadFilePopUp } from "./uploadFile";

function NavBar(props) {
  // const [checked, setChecked] = useState(false);

  return (
    <div class="container">
      <header class="row py-1 mb-4 border-bottom align-items-center">
        <div className="col-2">
          <a href="/#" class="me-auto">
            <img src={Pneunostics} width="auto" height="85" alt="NUS Logo" />
          </a>
        </div>

        <div className="col ">
          <a
            className="btn btn-danger float-end ms-3"
            onClick={SignOut}
            href="/login"
          >
            Sign Out
          </a>

          <ToggleButton
            className="btn float-end ms-3"
            id="toggle-check"
            type="checkbox"
            variant="outline-info"
            checked={props.darkMode}
            value="1"
            onChange={(e) => props.setDarkMode(e.currentTarget.checked)}
          >
            Dark Mode
          </ToggleButton>

          <button
            className="btn btn-danger float-end ms-3"
            onClick={ModalUploadFilePopUp(props)}
          >
            Upload HDF5 file
          </button>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
