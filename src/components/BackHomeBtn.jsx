import React from "react";
import { Link } from "react-router";

const BackHomeBtn = () => {
  return (
    <Link
      className="absolute top-1 left-3 text-blue-500 text-xl font-bold hover:underline"
      to={"/"}
    >
      Home
    </Link>
  );
};

export default BackHomeBtn;
