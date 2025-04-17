import React from "react";
import { Link } from "react-router";

const Home = () => {
  const links = [
    { label: "Calcul", path: "/calculation" },
    { label: "Orientation", path: "/orientation" },
    { label: "Détection d'erreurs", path: "/error-detection" },
    { label: "Catégories de mots", path: "/words-categories" },
  ];

  return (
    <div
      id="Hello"
      className="min-h-screen w-full flex justify-evenly items-center flex-col gap-5"
    >
      {links.map((link) => (
        <div key={link.label}>
          <Link
            className="card card-hover flex items-center justify-center w-xs h-28 text-xl font-bold"
            to={link.path}
          >
            {link.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
