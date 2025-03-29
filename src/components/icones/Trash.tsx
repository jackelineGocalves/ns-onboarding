import * as React from "react";

const Trash = (
  props: React.SVGProps<SVGSVGElement> & { classimg?: string }
) => (
  <svg
    className={props.classimg}
    /*width="32" height="32"*/ viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 7.97333C23.56 7.53333 19.0933 7.30666 14.64 7.30666C12 7.30666 9.36 7.44 6.72 7.70666L4 7.97333"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3333 6.62666L11.6266 4.88C11.84 3.61333 12 2.66666 14.2533 2.66666H17.7466C20 2.66666 20.1733 3.66666 20.3733 4.89333L20.6666 6.62666"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.1333 12.1867L24.2666 25.6133C24.12 27.7067 24 29.3333 20.28 29.3333H11.72C7.99997 29.3333 7.87997 27.7067 7.73331 25.6133L6.86664 12.1867"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.7733 22H18.2133"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6667 16.6667H19.3334"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Trash;
