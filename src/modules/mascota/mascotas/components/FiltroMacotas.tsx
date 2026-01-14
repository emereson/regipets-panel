import { Button, Input } from "@heroui/react";
import { inputClassNames } from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";
import ModalAddMascota from "./CrudMacotas/AddMascota";
import type { User } from "../../../../type/user";
import { useUserRole } from "../../../../utils/useUserRole";
interface DataFilters {
  dniNombre: string | null;
  correo: string | null;
}
interface DataFiltersUser {
  search: string | null;
}
interface Props {
  findMascotas: () => void;
  usuarios: User[];
  dataFilters: DataFiltersUser;
  setDataFilters: (e: DataFiltersUser) => void;
  dataFiltersMascotas: DataFilters;
  setDataFiltersMascotas: (e: DataFilters) => void;
  findUsuarios: () => void;
}

const FiltroMacotas = ({
  findMascotas,
  usuarios,
  dataFilters,
  setDataFilters,
  dataFiltersMascotas,
  setDataFiltersMascotas,
  findUsuarios,
}: Props) => {
  const userRole = useUserRole();
  console.log(userRole);

  return (
    <section className="w-full flex items-end gap-1 justify-between relative ">
      <div className="flex items-end gap-1">
        <Input
          className="w-3xs"
          classNames={inputClassNames}
          label="DNI/ NOMBRE DE LA MASCOTA"
          labelPlacement="outside"
          name="DNI/ NOMBRE DE LA MASCOTA"
          type="text"
          placeholder="..."
          onChange={(e) =>
            setDataFiltersMascotas({
              ...dataFiltersMascotas,
              dniNombre: e.target.value || null,
            })
          }
          value={dataFiltersMascotas.dniNombre || ""}
          radius="sm"
          size="sm"
          id="correoUsuario"
          variant="bordered"
        />
        <Input
          className="w-3xs"
          classNames={inputClassNames}
          label="CORREO DEL DUEÑO"
          labelPlacement="outside"
          name="CORREO DEL DUEÑO"
          type="text"
          placeholder="..."
          onChange={(e) =>
            setDataFiltersMascotas({
              ...dataFiltersMascotas,
              correo: e.target.value || null,
            })
          }
          value={dataFiltersMascotas.correo || ""}
          radius="sm"
          size="sm"
          id="correoUsuario"
          variant="bordered"
        />
        <Button
          type="submit"
          className=" bg-orange-500 h-9 min-w-[50px]  flex items-center justify-center cursor-pointer hover:bg-[#2776d8] transition-colors"
          onPress={findMascotas}
          radius="sm"
        >
          <RiSearchEyeFill className="text-xl text-white" />
        </Button>
      </div>
      {userRole && userRole === "Admin" && (
        <ModalAddMascota
          findMascotas={findMascotas}
          usuarios={usuarios}
          dataFilters={dataFilters}
          setDataFilters={setDataFilters}
          findUsuarios={findUsuarios}
        />
      )}
    </section>
  );
};

export default FiltroMacotas;
