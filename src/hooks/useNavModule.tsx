import { useCallback, useMemo } from "react";

interface UseNavModuleProps {
  moduleName: string;
  openListModule: string;
  setOpenListModule: (module: string) => void;
}

interface UseNavModuleReturn {
  isActive: boolean;
  handleToggle: () => void;
  headerClasses: string;
  dropdownClasses: string;
  arrowClasses: string;
}

export const useNavModule = ({
  moduleName,
  openListModule,
  setOpenListModule,
}: UseNavModuleProps): UseNavModuleReturn => {
  // Estado activo del módulo
  const isActive = useMemo(
    () => openListModule === moduleName,
    [openListModule, moduleName]
  );

  // Handler optimizado para toggle
  const handleToggle = useCallback(() => {
    setOpenListModule(isActive ? "" : moduleName);
  }, [isActive, moduleName, setOpenListModule]);

  // Estilos computados para el header
  const headerClasses = useMemo(
    () =>
      `w-[280px] flex items-center p-4 px-5 cursor-pointer transition-all duration-300 border-b border-zinc-300 group ${
        isActive
          ? "bg-[#0356ba] text-white"
          : "text-white hover:bg-[#1666c8] hover:text-white"
      }`,
    [isActive]
  );

  // Estilos computados para el dropdown
  const dropdownClasses = useMemo(
    () =>
      `w-full bg-[#1666c8] text-white transition-all duration-300 ease-in-out overflow-hidden ${
        isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`,
    [isActive]
  );

  // Estilos computados para la flecha
  const arrowClasses = useMemo(
    () =>
      `text-2xl transition-transform duration-300 ease-in-out ${
        isActive ? "rotate-180" : "rotate-0"
      }`,
    [isActive]
  );

  return {
    isActive,
    handleToggle,
    headerClasses,
    dropdownClasses,
    arrowClasses,
  };
};
