import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div className="flex justify-around items-center">
      <Link
        to="/"
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transition ${
          path === "/" ? "scale-[110%] opacity-100" : "opacity-40"
        }`}
      >
        <img
          src="/image/play.png"
          alt="play"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-[12px] font-bold text-white font-press-start">
          PLAY
        </p>
      </Link>

      <Link
        to="/boosts"
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transition ${
          path === "/boosts" ? "scale-[110%] opacity-100" : "opacity-40"
        }`}
      >
        <img
          src="/image/boosts.png"
          alt="boosts"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-[12px] font-bold text-white font-press-start">
          BOOSTS
        </p>
      </Link>

      <Link
        to="/tasks"
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transition ${
          path === "/tasks" ? "scale-[110%] opacity-100" : "opacity-40"
        }`}
      >
        <img
          src="/image/quest.png"
          alt="tasks"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-[12px] font-bold text-white font-press-start">
          TASKS
        </p>
      </Link>

      <Link
        to="/rank"
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transition ${
          location.pathname === "/rank"
            ? "scale-[110%] opacity-100"
            : "opacity-40"
        }`}
      >
        <img
          src="/image/ranking.png"
          alt="ranking"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-[12px] font-bold text-white font-press-start">
          RANKING
        </p>
      </Link>


    </div>
  );
}
