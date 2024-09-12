import SignUpHome from "@/app/components/auth-components/SignupHome";
import LeftContainer from "./leftContainer";

export default function SignUp() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LeftContainer />
      <SignUpHome />
    </div>
  );
}
