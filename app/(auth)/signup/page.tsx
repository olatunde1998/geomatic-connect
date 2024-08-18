import LeftContainer from "../login/leftContainer";
import SignUpHome from "./SignupHome";

export default function SignUp() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen ">
      <LeftContainer />
      <SignUpHome />
    </div>
  );
}
