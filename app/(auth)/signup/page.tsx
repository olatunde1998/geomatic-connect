import LeftContainer from "./leftContainer";
import SignUpHomeTwo from "./SignupHomeTwo";
// import SignUpHome from "./SignupHome";

export default function SignUp() {
  return (
    // Alternative one(1)
    // <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
    //   <LeftContainer />
    //   <SignUpHome />
    // </div>
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LeftContainer />
      <SignUpHomeTwo />
    </div>
  );
}
