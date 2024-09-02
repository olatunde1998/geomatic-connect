import LeftContainer from "./leftContainer";
import LoginHomeTwo from "./LoginHomeTwo";
// import LoginHome from "./LoginHome";

export default async function Login() {
  return (
    // Alternative one(1)
    // <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
    //   <LeftContainer />
    //   <LoginHome />
    // </div>

    // Alternative two
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LeftContainer />
      <LoginHomeTwo />
    </div>
  );
}
