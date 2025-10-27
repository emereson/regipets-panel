// ============================================
// 1. NavMascota.tsx - Ejemplo con el hook
// ============================================
import { MdOutlineCircle, MdOutlinePets } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { memo } from "react";
import { useNavModule } from "../../hooks/useNavModule";

interface Props {
  openListModule: string;
  setOpenListModule: (module: string) => void;
}

const NavMascota = memo(({ openListModule, setOpenListModule }: Props) => {
  const {
    isActive,
    handleToggle,
    headerClasses,
    dropdownClasses,
    arrowClasses,
  } = useNavModule({
    moduleName: "mascota",
    openListModule,
    setOpenListModule,
  });

  return (
    <nav className="relative">
      <button
        className={headerClasses}
        onClick={handleToggle}
        aria-expanded={isActive}
        aria-controls="mascota-submenu"
        type="button"
      >
        <div className="w-full flex gap-4 items-center">
          <MdOutlinePets className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          <span className="text-base font-medium">Mascota</span>
        </div>
        <IoMdArrowDropdown className={arrowClasses} />
      </button>

      <div id="mascota-submenu" className={dropdownClasses}>
        <Link
          className="h-[50px] flex items-center gap-4 px-8 hover:bg-[#0356ba] w-[280px] transition-all duration-300 group/item relative overflow-hidden"
          to="/mascotas"
        >
          <span className="absolute inset-0 bg-[#2776d8] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-out" />
          <div className="relative z-10 flex items-center gap-6">
            <MdOutlineCircle className="text-sm transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-180" />
            <span className="text-sm font-normal group-hover/item:translate-x-1 transition-transform duration-300">
              Mascotas
            </span>
          </div>
        </Link>
        <Link
          className="h-[50px] flex items-center gap-4 px-8 hover:bg-[#0356ba] w-[280px] transition-all duration-300 group/item relative overflow-hidden"
          to="/mascotas/busqueda"
        >
          <span className="absolute inset-0 bg-[#2776d8] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-out" />
          <div className="relative z-10 flex items-center gap-6">
            <MdOutlineCircle className="text-sm transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-180" />
            <span className="text-sm font-normal group-hover/item:translate-x-1 transition-transform duration-300">
              Busqueda
            </span>
          </div>
        </Link>
        <Link
          className="h-[50px] flex items-center gap-4 px-8 hover:bg-[#0356ba] w-[280px] transition-all duration-300 group/item relative overflow-hidden"
          to="/mascotas/raza"
        >
          <span className="absolute inset-0 bg-[#2776d8] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-out" />
          <div className="relative z-10 flex items-center gap-6">
            <MdOutlineCircle className="text-sm transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-180" />
            <span className="text-sm font-normal group-hover/item:translate-x-1 transition-transform duration-300">
              Raza
            </span>
          </div>
        </Link>
        <Link
          className="h-[50px] flex items-center gap-4 px-8 hover:bg-[#0356ba] w-[280px] transition-all duration-300 group/item relative overflow-hidden"
          to="/mascota/crear-cotizacion"
        >
          <span className="absolute inset-0 bg-[#2776d8] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-out" />
          <div className="relative z-10 flex items-center gap-6">
            <MdOutlineCircle className="text-sm transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-180" />
            <span className="text-sm font-normal group-hover/item:translate-x-1 transition-transform duration-300">
              Convenios
            </span>
          </div>
        </Link>
        <Link
          className="h-[50px] flex items-center gap-4 px-8 hover:bg-[#0356ba] w-[280px] transition-all duration-300 group/item relative overflow-hidden"
          to="/mascota/crear-cotizacion"
        >
          <span className="absolute inset-0 bg-[#2776d8] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-out" />
          <div className="relative z-10 flex items-center gap-6">
            <MdOutlineCircle className="text-sm transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-180" />
            <span className="text-sm font-normal group-hover/item:translate-x-1 transition-transform duration-300">
              Orden
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
});

export default NavMascota;
