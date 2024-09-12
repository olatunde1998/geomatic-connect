import VerifyEmail from "@/app/components/auth-components/VerifyEmail";
import LeftContainer from "./leftContainer";

export default async function VerifyEmailPage() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LeftContainer />
      <VerifyEmail />
    </div>
  );
}
