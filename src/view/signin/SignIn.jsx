import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "antd/dist/antd.css";

import { auth } from "../../firebase";
import constants from "../../constants/constants";
import googleLogo from "../../assets/png/googleLogo.png";

import styles from "./signInStyle.module.scss";

const { WELCOME, SIGN_IN } = constants;

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <div className={styles.main_wrapper}>
      <p>{WELCOME}</p>
      <h4> {SIGN_IN}</h4>
      <img onClick={signInWithGoogle} alt="google logo" src={googleLogo} />
    </div>
  );
};
