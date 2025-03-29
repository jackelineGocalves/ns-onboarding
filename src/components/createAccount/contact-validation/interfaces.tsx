import OTPImgNumber from "@/components/illustrations/OTPnumber";

export interface OTPobject {
   img: React.ReactElement,
   title: string,
   info: string, 
   label: string,
   placeHolder: string,
   tag: string,
   link: string 
}

const clientContentOTP : OTPobject = 
    {
        img: <OTPImgNumber classimg="OTP-img" />,
        title: "Contact Validation",
        info: "On this space insert the OTP we sent to this email’s associated phone-number",
        label: "OTP",
        placeHolder: "Fill this space with the OTP",
        tag: "Haven’t received the OTP. In 30 seconds",
        link: "Send Another"
    }
 
;

export default clientContentOTP;

