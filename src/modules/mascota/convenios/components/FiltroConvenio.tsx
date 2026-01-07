import { Button, Select, SelectItem } from "@heroui/react";
import { selectClassNames } from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { departamentos } from "../../../../data/ubigeos/departamentos";
import { provincias } from "../../../../data/ubigeos/provincias";
import { distritos } from "../../../../data/ubigeos/distritos";

interface DataFilters {
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
}

interface Props {
  setSelectCategoria: (e: string) => void;
  selectCategoria: string;
  findConvenios: () => void;
  setDataFilters: (filters: Partial<DataFilters>) => void;
}

const CATEGORIAS = [
  "Todos",
  "Celebraciones",
  "Comida",
  "Educación",
  "Entretenimiento",
  "Hoteles para mascotas",
  "Ropa y artículos",
  "Salud",
  "Seguros",
  "Tecnología",
  "Transporte",
  "Viajes",
];

const FiltroConvenio = ({
  setSelectCategoria,
  selectCategoria,
  findConvenios,
  setDataFilters,
}: Props) => {
  const [selectDepartamento, setSelectDepartamento] = useState<string>("");
  const [selectProvincia, setSelectProvincia] = useState<string>("");
  const [selectDistrito, setSelectDistrito] = useState<string>("");

  const handleDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectDepartamento(value);
    // Resetear provincia y distrito al cambiar departamento
    setSelectProvincia("");
    setSelectDistrito("");
  };

  const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectProvincia(value);
    // Resetear distrito al cambiar provincia
    setSelectDistrito("");
  };

  const handleDistritos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDistrito(e.target.value);
  };

  // Actualizar filtros cuando cambien los selects de ubicación
  useEffect(() => {
    const departamentoSeleccionado = departamentos.find(
      (departamento) => departamento.id === Number(selectDepartamento)
    );
    const provinciaSeleccionada = provincias.find(
      (provincia) => provincia.id === Number(selectProvincia)
    );
    const distritoSeleccionado = distritos.find(
      (distrito) => distrito.id === Number(selectDistrito)
    );

    setDataFilters({
      departamento: departamentoSeleccionado?.id.toString() || null,
      provincia: provinciaSeleccionada?.id.toString() || null,
      distrito: distritoSeleccionado?.id.toString() || null,
    });
  }, [selectDepartamento, selectProvincia, selectDistrito]);

  return (
    <form
      className="w-lg flex items-end gap-2 relative "
      onSubmit={(e) => {
        e.preventDefault();
        findConvenios();
      }}
    >
      <Select
        className="min-w-[180px] max-w-[180px]"
        classNames={selectClassNames}
        labelPlacement="outside"
        variant="bordered"
        label="Categoria"
        placeholder="Seleccionar..."
        radius="sm"
        size="sm"
        defaultSelectedKeys={[selectCategoria]}
        onChange={(e) => setSelectCategoria(e.target.value)}
      >
        {CATEGORIAS.map((categoria) => (
          <SelectItem key={categoria} textValue={categoria}>
            <p className="text-[12px]">{categoria}</p>
          </SelectItem>
        ))}
      </Select>
      <Select
        className="min-w-[180px] max-w-[180px]"
        classNames={selectClassNames}
        labelPlacement="outside"
        variant="bordered"
        label="Departamento"
        placeholder="Seleccionar..."
        radius="sm"
        size="sm"
        selectedKeys={selectDepartamento ? [selectDepartamento] : []}
        onChange={handleDepartamento}
      >
        <>
          <SelectItem key="" textValue="TODOS">
            <p className="text-[12px]">TODOS</p>
          </SelectItem>
          {departamentos.map((departamento) => (
            <SelectItem
              key={departamento.id.toString()}
              textValue={departamento.Departamento}
              className="text-[6px]"
            >
              <p className="text-[12px]">{departamento.Departamento}</p>
            </SelectItem>
          ))}
        </>
      </Select>

      <Select
        className="min-w-[180px] max-w-[180px]"
        classNames={selectClassNames}
        labelPlacement="outside"
        label="Provincia"
        placeholder="Seleccionar..."
        variant="bordered"
        radius="sm"
        size="sm"
        isDisabled={!selectDepartamento}
        selectedKeys={selectProvincia ? [selectProvincia] : []}
        onChange={handleProvincia}
      >
        <>
          <SelectItem key="" textValue="TODOS">
            <p className="text-[11px]">TODOS</p>
          </SelectItem>

          {provincias
            .filter(
              (provincia) => provincia.UbigeoId === Number(selectDepartamento)
            )
            .map((provincia) => (
              <SelectItem
                key={provincia.id.toString()}
                textValue={provincia.Provincia}
                className="text-[6px]"
              >
                <p className="text-[11px]">{provincia.Provincia}</p>
              </SelectItem>
            ))}
        </>
      </Select>

      <Select
        className="min-w-[180px] max-w-[180px]"
        classNames={selectClassNames}
        labelPlacement="outside"
        label="Distrito"
        placeholder="Seleccionar..."
        variant="bordered"
        radius="sm"
        size="sm"
        isDisabled={!selectProvincia}
        selectedKeys={selectDistrito ? [selectDistrito] : []}
        onChange={handleDistritos}
      >
        <>
          <SelectItem key="" textValue="TODOS">
            <p className="text-[11px]">TODOS</p>
          </SelectItem>
          {distritos
            .filter(
              (distrito) => distrito.UbigeoProvId === Number(selectProvincia)
            )
            .map((distrito) => (
              <SelectItem
                key={distrito.id.toString()}
                textValue={distrito.Distrito}
                className="text-[6px]"
              >
                <p className="text-[11px]">{distrito.Distrito}</p>
              </SelectItem>
            ))}
        </>
      </Select>
      <Button
        type="submit"
        className=" bg-orange-500 min-w-[56px]  rounded-r-xl -bottom-0.5 z-[2] flex items-center justify-center cursor-pointer hover:bg-orange-400 transition-colors"
      >
        <RiSearchEyeFill className="text-2xl text-white" />
      </Button>
    </form>
  );
};

export default FiltroConvenio;
