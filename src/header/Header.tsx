import { useState } from "react";
import NavMascota from "./components/NavMascota";
import NavUsuarios from "./components/NavUsuarios";
import { Link } from "react-router-dom";
import { BsDoorOpenFill } from "react-icons/bs";

const Header = () => {
  const [openListModule, setOpenListModule] = useState("");

  const sharedNavProps = {
    openListModule,
    setOpenListModule,
  };

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header
      className="w-[62px] h-[100vh] bg-[#0356ba] flex flex-col z-30 border-r-3 border-orange-500
             hover:w-[280px] duration-300 overflow-hidden 
             shadow-[4px_0_10px_rgba(249,115,22,0.5)]"
    >
      <Link className=" h-32 flex items-center justify-center" to="/">
        <img
          className="w-28  m-auto  group-hover:opacity-100 duration-300"
          src={"/logo.webp"}
          alt=""
        />
      </Link>
      <NavMascota {...sharedNavProps} />
      <NavUsuarios {...sharedNavProps} />
      <button
        className={`w-[280px]  text-white  flex items-center p-4 px-5 cursor-pointer transition-all duration-300 border-b border-zinc-300 hover:bg-[#1666c8] `}
        onClick={logOut}
        aria-controls="mascota-submenu"
        type="button"
      >
        <div className="w-full flex gap-4 items-center">
          <BsDoorOpenFill className="text-2xl text-red-400 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-base font-medium">Cerrar Sesion</span>
        </div>
      </button>
    </header>
  );
};

export default Header;
