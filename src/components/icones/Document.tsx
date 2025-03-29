import * as React from "react";

const Docmuent = (
  props: React.SVGProps<SVGSVGElement> & { classimg?: string }
) => (
  <svg
    className={props.classimg}
    /*width="32" height="32"*/ viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29.3334 13.3334V20C29.3334 26.6667 26.6667 29.3334 20 29.3334H12C5.33335 29.3334 2.66669 26.6667 2.66669 20V12C2.66669 5.33335 5.33335 2.66669 12 2.66669H18.6667"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.3334 13.3334H24C20 13.3334 18.6667 12 18.6667 8.00002V2.66669L29.3334 13.3334Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33331 17.3333H17.3333"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33331 22.6667H14.6666"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Docmuent;
