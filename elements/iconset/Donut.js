import React from "react";

function Donut() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="0 0 32 32"
      version="1.1"
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M16 32C7.178 32 0 24.822 0 16S7.178 0 16 0s16 7.178 16 16-7.178 16-16 16zm0-30C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2z"></path>
      <path d="M16 22c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm0-10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"></path>
      <path d="M6 19c-1.654 0-3-1.346-3-3 0-.551-.448-1-1-1v-2c1.654 0 3 1.346 3 3a1.001 1.001 0 002 0c0-1.654 1.346-3 3-3h1v2h-1c-.552 0-1 .449-1 1 0 1.654-1.346 3-3 3zM30 19c-1.654 0-3-1.346-3-3a1.001 1.001 0 00-2 0c0 1.654-1.346 3-3 3h-2v-2h2c.552 0 1-.449 1-1 0-1.654 1.346-3 3-3s3 1.346 3 3c0 .551.448 1 1 1v2z"></path>
      <circle cx="16" cy="6" r="1"></circle>
      <circle cx="23" cy="9" r="1"></circle>
      <circle cx="9" cy="23" r="1"></circle>
      <circle cx="16" cy="26" r="1"></circle>
      <circle cx="23" cy="23" r="1"></circle>
      <circle cx="9" cy="9" r="1"></circle>
    </svg>
  );
}

export default Donut;
