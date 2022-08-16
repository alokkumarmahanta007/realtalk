import React, { useState } from "react";
import { Button } from "antd";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import data from "@emoji-mart/data";
import { SmileTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import Picker from "@emoji-mart/react";

import { db, auth } from "../../firebase";
import constants from "../../constants/constants.jsx";

import styles from "./sendMsgStyles.module.scss";

const { SEND } = constants;
export const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);

  const getEmoji = (emojiData) => {
    console.log(emojiData);
    setMessage(message + emojiData?.native);
  };

  const sendMessages = async () => {
    const { uid, photoURL, displayName } = auth.currentUser;
    console.log(auth.currentUser);
    await addDoc(collection(db, "messages"), {
      Text: message,
      photoURL,
      uid,
      displayName,
      createdAt: serverTimestamp(),
    });
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  const toggleEmojiContainer = () => {
    setToggle(!toggle);
  };
  console.log(toggle);
  return (
    <div className={styles.main_wrapper}>
      <input
        value={message}
        placeholder="send message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={sendMessages}>{SEND}</Button>
      <div className={styles.icon_div} onClick={toggleEmojiContainer}>
        <SmileTwoTone />
      </div>
      {toggle ? (
        <div
          onMouseLeave={toggleEmojiContainer}
          className={styles.picker_mainDiv}
        >
          <Picker data={data} onEmojiSelect={getEmoji} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
