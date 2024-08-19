import LeftContainer from "./leftContainer";
import LoginHome from "./LoginHome";

export default function Login() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LeftContainer />
      <LoginHome />
    </div>
  );
}
