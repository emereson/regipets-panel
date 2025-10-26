import { Input } from "@heroui/react";
import { inputClassNames } from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";

interface Props {
  setDniNombre: (e: string) => void;
  dniNombre: string;
  findMascotas: () => void;
}

const FiltroMacotas = ({ setDniNombre, dniNombre, findMascotas }: Props) => {
  return (
    <section className="w-fit flex items-end gap-2 relative ">
      <Input
        className="w-xs"
        classNames={inputClassNames}
        label="DNI/NOMBRE APELLIDOS"
        labelPlacement="outside"
        name="DNI/NOMBRE APELLIDOS"
        type="string"
        placeholder="..."
        onChange={(e) => setDniNombre(e.target.value)}
        value={dniNombre}
        radius="sm"
        size="md"
        id="correoUsuario"
        variant="bordered"
      />
      <button
        type="submit"
        className="absolute bg-orange-500 h-11 min-w-[56px] -right-12 rounded-r-xl -bottom-0.5 z-[2] flex items-center justify-center cursor-pointer hover:bg-orange-400 transition-colors"
        onClick={findMascotas}
      >
        <RiSearchEyeFill className="text-2xl text-white" />
      </button>
    </section>
  );
};

export default FiltroMacotas;
