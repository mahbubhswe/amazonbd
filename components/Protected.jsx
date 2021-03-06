import { useUserAuth } from "../utils/userContext";
import SignIn from "../components/SignIn";
export default function Protected({ children }) {
  const { user } = useUserAuth();

  if (!user) {
    return <SignIn></SignIn>;
  }

  return children;
}
