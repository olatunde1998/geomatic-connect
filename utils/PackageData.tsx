import { MdCheckCircle } from "react-icons/md";
import { BsDashLg } from "react-icons/bs";

export const packageData = {
  accessToEmailNotifications: [
    <MdCheckCircle key={1} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={2} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={3} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
  ],
  communityChannel: [
    <MdCheckCircle key={1} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={2} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={3} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
  ],
  accessToCompany: [5, 10, 20],
  requestsPerMth: [5, 10, "Unlimited"],
  accessToSurveyGeneral: [
    <BsDashLg key={1} />,
    <BsDashLg key={1} />,
    <MdCheckCircle key={3} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
  ],
  supportLevel: ["Email Only", "Email & Chat", "Dedicated Support Team"],
  cvBuilder: [
    <BsDashLg key={1} />,
    <BsDashLg key={1} />,
    <MdCheckCircle key={3} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
  ],
  documentAnalyzer: [
    <BsDashLg key={1} />,
    <MdCheckCircle key={2} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={3} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
  ],
  blogs: [
    <MdCheckCircle key={1} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={2} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
    <MdCheckCircle key={3} color="#12B76A" className="w-5 h-4 lg:w-5 lg:h-5" />,
  ],
};
