import ResetPassword from "@/app/components/auth-components/ResetPassword";
import LeftContainer from "./leftContainer";

export default async function ResetPasswordPage() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LeftContainer />
      <ResetPassword />
    </div>
  );
}
