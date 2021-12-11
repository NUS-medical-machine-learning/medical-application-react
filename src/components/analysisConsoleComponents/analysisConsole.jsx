import React, { Component } from "react";
import NavBar from "./navbar";
import SubjectInfo from "./subjectInfoBar";
import InfoConsoles from "./infoConsoles";

class AnalysisConsole extends React.Component {
  render() {
    return (
      <div>
        <NavBar />

        <SubjectInfo />

        <InfoConsoles />
      </div>
    );
  }
}

export default AnalysisConsole;
