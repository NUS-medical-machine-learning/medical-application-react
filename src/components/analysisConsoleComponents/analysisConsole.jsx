import React, { useState, useEffect, useRef } from "react";
import NavBar from "./navbar";
import ControlButtons from "./controlButtons";
import SubjectIdInput from "./subjectIdInput";
import Breathe from "./Breath/Breath";
import firebase from "firebase/compat/app";

import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";

import { TestingProgress } from "./testing-progress.js";

import { handleBreatheStopSilent } from "./controlButtons";

import { renewData } from "./Breath/TimeSeriesContainer/BreathTimeSeriesContainer";

import { subjectIdPrefix } from "./subjectIdInput";

import ModalResult from "./modalResult";

const DEFAULT_SUBJECT_ID = "";

function AnalysisConsole(props) {
  console.log("AnalysisConsole called");

  const [darkMode, setDarkMode] = useState(false);
  const [subjectId, setSubjectId] = useState(DEFAULT_SUBJECT_ID);
  const [testingProgressState, setTestingProgressState] = useState(
    TestingProgress.SubjectIdReceived
  );

  useEffect(() => {
    console.log("Testing Progress State", testingProgressState.progressName);
  }, [testingProgressState]);

  const [isLoadingMainButton, setIsLoadingMainButton] = useState(false);

  const [showModalResult, setShowModalResult] = useState(false);
  const [currentModalResultType, setCurrentModalResultType] = useState(
    null
  );

  const chartRef = useRef(null);

  const handleChange = (event) => {
    setSubjectId(event.target.value);
  };

  const getFullSubjectId = () => {
    return subjectIdPrefix + subjectId;
  };

  const resetSubjectId = () => setSubjectId(DEFAULT_SUBJECT_ID);

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  const resetToNewProgress = () => {
    resetSubjectId();
    setIsLoadingMainButton(false);
    handleBreatheStopSilent();
    setTestingProgressState(TestingProgress.SubjectIdReceived);
    setShowModalResult(false);
    renewData(chartRef.current);
    // refreshPage();
  };

  useWindowUnloadEffect(() => {
    console.log("reloaded");
    resetToNewProgress();
  }, true);

  let isDarkMode = darkMode ? "dark" : "";

  return (
    <body id="my-div" className={isDarkMode}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
      </svg>
      <div className="">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </div>

      <section className="">
        <ModalResult
          showModalResult={showModalResult}
          setShowModalResult={setShowModalResult}
          currentModalResultType={currentModalResultType}
          getFullSubjectId={getFullSubjectId}
          resetToNewProgress={resetToNewProgress}
        />
      </section>

      <section className="">
        <NavBar darkMode={darkMode} setDarkMode={(bool) => setDarkMode(bool)} />
      </section>

      <section className="">
        <div class="container py-1 px-5">
          <div class="card shadow rounded">
            <div class="card-header p-3 bg-supporting">
              <span class="fs-5">
                Operator Workstation for{" "}
                <span class="fw-bold text-uppercase">
                  {firebase.auth().currentUser.email}
                </span>
              </span>
            </div>
            <div class="card-body bg-tertiary">
              <Breathe
                chartRef={chartRef}
                compoundDetectionSocket={props.compoundDetectionSocket}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container py-3 px-5">
          <div className="">
            <div className="row">
              <div className="col-9">
                <div className="shadow rounded">
                  <div class="card shadow rounded">
                    <div class="card-header px-3 py-2 bg-supporting">
                      <svg
                        className="bi flex-shrink-0 me-2"
                        width={24}
                        height={24}
                        role="img"
                        aria-label="Success:"
                      >
                        <use xlinkHref="#info-fill" />
                      </svg>
                      <span class="align-middle">
                        <span class="fs-5">SUBJECT INFO</span>
                      </span>
                    </div>
                    <div class="card-body bg-tertiary">
                      <SubjectIdInput
                        onChange={handleChange}
                        subjectId={subjectId}
                        testingProgressState={testingProgressState}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <ControlButtons
                  testingProgressState={testingProgressState}
                  setTestingProgressState={setTestingProgressState}
                  subjectId={subjectId}
                  resetToNewProgress={resetToNewProgress}
                  isLoadingMainButton={isLoadingMainButton}
                  setIsLoadingMainButton={setIsLoadingMainButton}
                  getFullSubjectId={getFullSubjectId}
                  setShowModalResult={setShowModalResult}
                  setCurrentModalResultType={setCurrentModalResultType}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

const useWindowUnloadEffect = (handler, callOnCleanup) => {
  const cb = useRef();

  cb.current = handler;

  useEffect(() => {
    const handler = () => cb.current();

    window.addEventListener("beforeunload", handler);

    return () => {
      if (callOnCleanup) handler();

      window.removeEventListener("beforeunload", handler);
    };
  }, [callOnCleanup]);
};

export default AnalysisConsole;
