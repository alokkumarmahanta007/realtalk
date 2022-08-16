import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import "antd/dist/antd.css";

import "./App.css";

import { SignIn } from "./view/signin/SignIn";
import { Chat } from "./view/chat/Chat";

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  return <div className="main_wrapper">{user ? <Chat /> : <SignIn />}</div>;
}

export default App;
