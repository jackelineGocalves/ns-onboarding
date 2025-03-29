import * as React from "react";

const Mail = (props: React.SVGProps<SVGSVGElement> & { classimg?: string }) => (
  <svg
    className={props.classimg}
    /*width="16" height="16"*/ viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.3333 13.6666H4.66668C2.66668 13.6666 1.33334 12.6666 1.33334 10.3333V5.66665C1.33334 3.33331 2.66668 2.33331 4.66668 2.33331H11.3333C13.3333 2.33331 14.6667 3.33331 14.6667 5.66665V10.3333C14.6667 12.6666 13.3333 13.6666 11.3333 13.6666Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3333 6L9.24665 7.66667C8.55999 8.21333 7.43332 8.21333 6.74665 7.66667L4.66666 6"
      stroke="#101213"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Mail;
