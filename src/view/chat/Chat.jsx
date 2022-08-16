import React, { useEffect, useRef } from "react";
import { auth, db } from "../../firebase";
import { collection, orderBy, query, limit } from "firebase/firestore";
import { SendMessage } from "../sendmessage/SendMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import classNames from "classnames";

import styles from "./chat.module.scss";

import { SignOut } from "../signout/SignOut";

export const Chat = () => {
  const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
  const messages = useCollectionData(q);
  const scroll = useRef();
  console.log(messages);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className={styles.main_wrapper}>
      <SignOut />
      <div className={styles.chat_container}>
        {messages &&
          messages[0]?.map(({ uid, Text, photoURL }) => {
            return (
              <div className={styles.main_textbox_wrapper}>
                <img
                  className={classNames({
                    [styles.sent_img]: uid === auth.currentUser.uid,
                  })}
                  alt="Avatar"
                  src={photoURL}
                />
                <div
                  className={classNames({
                    [styles.sent_messages]: uid === auth.currentUser.uid,
                    [styles.received_messages]: true,
                  })}
                >
                  <span>{Text}</span>
                </div>
              </div>
            );
          })}
        <div ref={scroll}></div>
      </div>

      <SendMessage scroll={scroll} />
    </div>
  );
};
