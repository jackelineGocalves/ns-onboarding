import * as React from "react";

const Download = (
  props: React.SVGProps<SVGSVGElement> & { classimg?: string }
) => (
  <svg
    className={props.classimg}
    /*width="24" height="24"*/ viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.44 8.89999C20.04 9.20999 21.51 11.06 21.51 15.11V15.24C21.51 19.71 19.72 21.5 15.25 21.5H8.73998C4.26998 21.5 2.47998 19.71 2.47998 15.24V15.11C2.47998 11.09 3.92998 9.23999 7.46998 8.90999"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2V14.88"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.35 12.65L12 16L8.65002 12.65"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Download;
