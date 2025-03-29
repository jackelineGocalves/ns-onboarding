import OTPImgEmail from "@/components/illustrations/OTPemail";
import { OTPobject } from "../contact-validation/interfaces";

const clientContentOTPemail : OTPobject = 
    {
        img: <OTPImgEmail classimg="OTP-img" />,
        title: "Contact Validation",
        info: "On this space insert the OTP we sent to this email’s associated email",
        label: "OTP",
        placeHolder: "Fill this space with the OTP",
        tag: "Haven’t received the OTP. In 30 seconds",
        link: "Send Another"
    }
;

export default clientContentOTPemail;

