// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate } from "react-router-dom";
import nusLogo from "../resources/images/logoNUS.png";

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
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
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
      <main class="form-signin">
        <img
          src={nusLogo}
          class="mb-5"
          width="219"
          height="auto"
          alt="NUS Logo"
        />

        <StyledFirebaseAuth
          class="rounded"
          uiCallback={(ui) => ui.disableAutoSignIn()}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <p class="mt-5 mb-3 text-muted">© 2021-2022</p>
      </main>
    );
  }
  
  return (
    <Navigate to="/" />
  );
}

export default SignInScreen;
