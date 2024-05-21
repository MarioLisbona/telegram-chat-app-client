import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingFullScreen from "./components/LoadingFullScreen";
import LoginWindow from "./components/LoginWindow";

export default function Login() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  // useEffect to automatically load the chat page if the user is returned by useAuthState
  useEffect(() => {
    if (user) navigate("/chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return <>{loading ? <LoadingFullScreen /> : <LoginWindow />}</>;
}
