import { Button, Input, Select, SelectItem } from "@heroui/react";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";
import UpdateEstadoAprobacion from "./UpdateEstadoAprobacion";

interface DataFilters {
  dniNombre: string | null;
  correo: string | null;
  rol: string | null;
  estado: string | null;
}

interface Props {
  findMascotas: () => void;
  dataFiltersMascotas: DataFilters;
  setDataFiltersMascotas: (e: DataFilters) => void;
  selectedMascotaIds: number[];
  setSelectedMascotaIds: (ids: number[]) => void;
}

const FiltroAprobacion = ({
  findMascotas,
  dataFiltersMascotas,
  setDataFiltersMascotas,
  selectedMascotaIds,
  setSelectedMascotaIds,
}: Props) => {
  return (
    <section className="w-full flex items-end gap-1 justify-between relative ">
      <div className="flex items-end gap-1">
        <Input
          className="w-3xs"
          classNames={inputClassNames}
          label="CORREO DEL CREADOR"
          labelPlacement="outside"
          name="CORREO DEL CREADOR"
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
        <Select
          className="min-w-[180px] max-w-[180px]"
          classNames={selectClassNames}
          labelPlacement="outside"
          variant="bordered"
          label="ROL DEL CREADOR"
          placeholder="Seleccionar..."
          radius="sm"
          size="sm"
          selectedKeys={[dataFiltersMascotas.rol || ""]}
          onChange={(e) =>
            setDataFiltersMascotas({
              ...dataFiltersMascotas,
              rol: e.target.value,
            })
          }
        >
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
        </Select>
        <Select
          className="min-w-[180px] max-w-[180px]"
          classNames={selectClassNames}
          labelPlacement="outside"
          variant="bordered"
          label="ESTADO DE APROBACIÓN"
          placeholder="Seleccionar..."
          radius="sm"
          size="sm"
          selectedKeys={[dataFiltersMascotas.estado || "PENDIENTE"]}
          onChange={(e) =>
            setDataFiltersMascotas({
              ...dataFiltersMascotas,
              estado: e.target.value,
            })
          }
        >
          <SelectItem key="PENDIENTE" textValue="PENDIENTE">
            <p className="text-[12px]">PENDIENTE</p>
          </SelectItem>
          <SelectItem key="APROBADO" textValue="APROBADO">
            <p className="text-[12px]">APROBADO</p>
          </SelectItem>
          <SelectItem key="DENEGADO" textValue="DENEGADO">
            <p className="text-[12px]">DENEGADO</p>
          </SelectItem>
        </Select>
        <Button
          type="submit"
          className=" bg-orange-500 h-9 min-w-[50px]  flex items-center justify-center cursor-pointer hover:bg-[#2776d8] transition-colors"
          onPress={findMascotas}
          radius="sm"
        >
          <RiSearchEyeFill className="text-xl text-white" />
        </Button>
      </div>
      <UpdateEstadoAprobacion
        findMascotas={findMascotas}
        selectedMascotaIds={selectedMascotaIds}
        setSelectedMascotaIds={setSelectedMascotaIds}
      />
    </section>
  );
};

export default FiltroAprobacion;
