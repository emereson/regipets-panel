import { Button, Input, Select, SelectItem } from "@heroui/react";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";
import ModalAddUsuario from "./CrudUsuario/ModalAddUsuario";

interface DataFilters {
  search: string | null;
  rol: string | null;
}

interface Props {
  setDataFilters: (e: DataFilters) => void;
  dataFilters: DataFilters;
  findUsuarios: () => void;
}

const FiltroUsuarios = ({
  setDataFilters,
  dataFilters,
  findUsuarios,
}: Props) => {
  return (
    <section className="w-full  flex items-end gap-1  justify-between ">
      <div className="w-full max-w-3xl flex items-end gap-1 ">
        <Input
          className=""
          classNames={inputClassNames}
          label="Nombre Apellidos - email - celular"
          labelPlacement="outside"
          name="NOMBRE APELLIDOS"
          type="string"
          placeholder="Buscar por Nombre Apellidos - email O celular"
          onChange={(e) =>
            setDataFilters({ ...dataFilters, search: e.target.value || "" })
          }
          value={dataFilters.search || ""}
          radius="sm"
          size="sm"
          id="correoUsuario"
          variant="bordered"
        />
        <Select
          className="min-w-[180px] max-w-[180px]"
          classNames={selectClassNames}
          labelPlacement="outside"
          variant="bordered"
          label="Roles"
          placeholder="Seleccionar..."
          radius="sm"
          size="sm"
          selectedKeys={[dataFilters.rol || ""]}
          onChange={(e) =>
            setDataFilters({ ...dataFilters, rol: e.target.value })
          }
        >
          <>
            <SelectItem key="" textValue="Todos">
              <p className="text-[12px]">Todos</p>
            </SelectItem>
            <SelectItem key="Admin" textValue="Admin">
              <p className="text-[12px]">Admin</p>
            </SelectItem>
            <SelectItem key="Cliente RUMP" textValue="Cliente RUMP">
              <p className="text-[12px]">Cliente RUMP</p>
            </SelectItem>
            <SelectItem key="Cliente Premium" textValue="Cliente Premium">
              <p className="text-[12px]">Cliente Premium</p>
            </SelectItem>
            <SelectItem key="Embajador" textValue="Embajador">
              <p className="text-[12px]">Embajador</p>
            </SelectItem>
            <SelectItem key="Aliado" textValue="Aliado">
              <p className="text-[12px]">Aliado</p>
            </SelectItem>
            <SelectItem key="Gobierno" textValue="Gobierno">
              <p className="text-[12px]">Gobierno</p>
            </SelectItem>
          </>
        </Select>
        <Button
          type="submit"
          className=" bg-[#0356ba] h-9 min-w-[50px]  flex items-center justify-center cursor-pointer hover:bg-[#2776d8] transition-colors"
          onPress={findUsuarios}
          radius="sm"
        >
          <RiSearchEyeFill className="text-xl text-white" />
        </Button>
      </div>
      <ModalAddUsuario findUsuarios={findUsuarios} />
    </section>
  );
};

export default FiltroUsuarios;
