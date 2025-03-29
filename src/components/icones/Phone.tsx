import * as React from "react";

const Phone = (
  props: React.SVGProps<SVGSVGElement> & { classimg?: string }
) => (
  <svg
    className={props.classimg}
    /*width="16" height="16"*/ viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.3333 4.66665V11.3333C13.3333 14 12.6667 14.6666 9.99999 14.6666H5.99999C3.33332 14.6666 2.66666 14 2.66666 11.3333V4.66665C2.66666 1.99998 3.33332 1.33331 5.99999 1.33331H9.99999C12.6667 1.33331 13.3333 1.99998 13.3333 4.66665Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33332 3.66663H6.66666"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99998 12.7333C8.57067 12.7333 9.03331 12.2707 9.03331 11.7C9.03331 11.1293 8.57067 10.6666 7.99998 10.6666C7.42928 10.6666 6.96664 11.1293 6.96664 11.7C6.96664 12.2707 7.42928 12.7333 7.99998 12.7333Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Phone;
