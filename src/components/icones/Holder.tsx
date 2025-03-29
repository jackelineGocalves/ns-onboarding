import * as React from "react";

const Holder = (
  props: React.SVGProps<SVGSVGElement> & { classimg?: string }
) => (
  <svg
    className={props.classimg}
    /*width="32" height="32"*/ viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.16 17.04C16.0666 17.0266 15.9466 17.0266 15.84 17.04C13.4933 16.96 11.6266 15.04 11.6266 12.68C11.6266 10.2666 13.5733 8.30664 16 8.30664C18.4133 8.30664 20.3733 10.2666 20.3733 12.68C20.36 15.04 18.5066 16.96 16.16 17.04Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.9866 25.84C22.6133 28.0134 19.4666 29.3334 16 29.3334C12.5333 29.3334 9.38664 28.0134 7.01331 25.84C7.14664 24.5867 7.94664 23.36 9.37331 22.4C13.0266 19.9734 19 19.9734 22.6266 22.4C24.0533 23.36 24.8533 24.5867 24.9866 25.84Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 29.3334C23.3638 29.3334 29.3334 23.3638 29.3334 16C29.3334 8.63622 23.3638 2.66669 16 2.66669C8.63622 2.66669 2.66669 8.63622 2.66669 16C2.66669 23.3638 8.63622 29.3334 16 29.3334Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Holder;
