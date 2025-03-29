import * as React from 'react';

const HandThumpsUp = (
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
      d="M9.97333 24.4667L14.1067 27.6667C14.64 28.2 15.84 28.4667 16.64 28.4667H21.7067C23.3067 28.4667 25.04 27.2667 25.44 25.6667L28.64 15.9333C29.3067 14.0667 28.1067 12.4667 26.1067 12.4667H20.7733C19.9733 12.4667 19.3067 11.8 19.44 10.8667L20.1067 6.6C20.3733 5.4 19.5733 4.06666 18.3733 3.66666C17.3067 3.26666 15.9733 3.8 15.44 4.6L9.97333 12.7333"
      stroke="#101213"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
    <path
      d="M3.17334 24.4667V11.4C3.17334 9.53337 3.97334 8.8667 5.84001 8.8667H7.17334C9.04001 8.8667 9.84001 9.53337 9.84001 11.4V24.4667C9.84001 26.3334 9.04001 27 7.17334 27H5.84001C3.97334 27 3.17334 26.3334 3.17334 24.4667Z"
      stroke="#101213"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HandThumpsUp; 