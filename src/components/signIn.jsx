// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate } from "react-router-dom";

import Pneunostics from "../resources/images/Pneunostic-Logo.svg";


// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyBhRwDtF1z86GzQsiD-ElVRpbjn0aQMkDo",
  authDomain: "medical-application-bee0a.firebaseapp.com",
  projectId: "medical-application-bee0a",
  storageBucket: "medical-application-bee0a.appspot.com",
  messagingSenderId: "454353371186",
  appId: "1:454353371186:web:c35be7e8ac9c48db68bc2b",
};
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <body id="body-sign-in">
        <div id="div-sign-in">
          <div class="d-flex justify-content-center">
            <img
              src={Pneunostics}
              class=""
              width="190"
              height="auto"
              alt="Pneunostics Logo"
            />
          </div>

          <hr></hr>

          <StyledFirebaseAuth
            class="rounded"
            uiCallback={(ui) => ui.disableAutoSignIn()}
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <div class="d-flex justify-content-center">
            <p class="mt-5 mb-3 text-muted">© 2021-2022</p>
          </div>
        </div>
      </body>
    );
  }
  
  return (
    <Navigate to="/" />
  );
}

export default SignInScreen;
