import React from "react";
import { Button } from "antd";
import { auth } from "../../firebase";
import { LogoutOutlined } from "@ant-design/icons";

import styles from "./signOut.module.scss";

export const SignOut = () => {
  return (
    <div className={styles.main_wrapper}>
      <LogoutOutlined title="Sign out" onClick={() => auth.signOut()} />
    </div>
  );
};
