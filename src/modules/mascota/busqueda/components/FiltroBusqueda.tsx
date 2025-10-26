import { Autocomplete, Button, Input, Select, SelectItem } from "@heroui/react";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";
import { departamentos } from "../../../../data/ubigeos/departamentos";
import { provincias } from "../../../../data/ubigeos/provincias";
import { useEffect, useState } from "react";
import { distritos } from "../../../../data/ubigeos/distritos";
import useSelectEspeciesRaza from "../../../../hooks/SelectEspeciesRaza";

interface DataFilters {
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
  dniNombre: string | null;
  nombreDueno: string | null;
  especie?: string | null;
  raza?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
}

interface Props {
  findMascotas: () => void;
  setDataFilters: (filters: Partial<DataFilters>) => void;
  dataFilters: DataFilters;
  isLoading?: boolean;
}

const FiltroBusqueda = ({
  findMascotas,
  setDataFilters,
  dataFilters,
  isLoading = false,
}: Props) => {
  const {
    especies,
    selectEspecie,
    setSelectEspecie,
    razas,
    selectRaza,
    setSelectRaza,
    loadingRaza,
  } = useSelectEspeciesRaza();

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

  const handleEspecie = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectEspecie(e.target.value);
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

  // Actualizar filtros de especie y raza
  useEffect(() => {
    setDataFilters({
      especie: selectEspecie || null,
      raza: `${selectRaza}` || null,
    });
  }, [selectEspecie, selectRaza]);

  return (
    <section className="w-full flex flex-col items-end gap-4 relative">
      <div className="w-full  flex gap-2">
        <Input
          classNames={inputClassNames}
          label="Nombre de la mascota"
          labelPlacement="outside"
          name="nombreMascota"
          type="text"
          placeholder="Buscar por nombre..."
          onChange={(e) =>
            setDataFilters({ dniNombre: e.target.value || null })
          }
          value={dataFilters.dniNombre || ""}
          radius="sm"
          size="sm"
          variant="bordered"
        />
        <Input
          classNames={inputClassNames}
          label="DNI o Nombre del dueño"
          labelPlacement="outside"
          name="dniDueno"
          type="text"
          placeholder="Buscar por DNI o nombre..."
          onChange={(e) =>
            setDataFilters({ nombreDueno: e.target.value || null })
          }
          value={dataFilters.nombreDueno || ""}
          radius="sm"
          size="sm"
          variant="bordered"
        />
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
          {departamentos.map((departamento) => (
            <SelectItem key={departamento.id.toString()}>
              {departamento.Departamento}
            </SelectItem>
          ))}
        </Select>

        <Select
          className="min-w-[180px] max-w-[180px]"
          classNames={{
            ...selectClassNames,
            value: "text-[0.8rem]",
          }}
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
          {provincias
            .filter(
              (provincia) => provincia.UbigeoId === Number(selectDepartamento)
            )
            .map((provincia) => (
              <SelectItem key={provincia.id.toString()}>
                {provincia.Provincia}
              </SelectItem>
            ))}
        </Select>

        <Select
          className="min-w-[180px] max-w-[180px]"
          classNames={{
            ...selectClassNames,
            value: "text-[0.8rem]",
          }}
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
          {distritos
            .filter(
              (distrito) => distrito.UbigeoProvId === Number(selectProvincia)
            )
            .map((distrito) => (
              <SelectItem key={distrito.id.toString()}>
                {distrito.Distrito}
              </SelectItem>
            ))}
        </Select>
      </div>

      <div className="w-full flex items-end gap-2">
        <Select
          className="w-full"
          classNames={selectClassNames}
          labelPlacement="outside"
          variant="bordered"
          label="Especie"
          placeholder="Seleccionar..."
          radius="sm"
          size="sm"
          selectedKeys={selectEspecie ? [selectEspecie] : []}
          onChange={handleEspecie}
        >
          {especies.map((especie) => (
            <SelectItem key={especie.id.toString()}>
              {especie.title_es}
            </SelectItem>
          ))}
        </Select>

        <Autocomplete
          className="w-full"
          inputProps={{
            classNames: {
              input: "text-xs",
              inputWrapper: "min-h-10 border-1.5 border-neutral-400",
              label: "pb-1 text-[0.8rem] text-neutral-800 font-semibold",
            },
          }}
          labelPlacement="outside"
          label="Raza"
          placeholder="Seleccionar..."
          variant="bordered"
          radius="sm"
          size="sm"
          isDisabled={!selectEspecie}
          defaultSelectedKey={`${selectRaza}`}
          onSelectionChange={(key) => setSelectRaza(key as string)}
          isLoading={loadingRaza}
        >
          {razas.map((raza) => (
            <SelectItem key={raza.id.toString()}>{raza.title_es}</SelectItem>
          ))}
        </Autocomplete>
        <Input
          classNames={inputClassNames}
          label="Fecha desde"
          labelPlacement="outside"
          name="fechaDesde"
          type="date"
          onChange={(e) => setDataFilters({ fechaDesde: e.target.value })}
          value={dataFilters.fechaDesde || ""}
          radius="sm"
          size="sm"
          variant="bordered"
        />
        <Input
          classNames={inputClassNames}
          label="Fecha hasta"
          labelPlacement="outside"
          name="fechaHasta"
          type="date"
          onChange={(e) => setDataFilters({ fechaHasta: e.target.value })}
          value={dataFilters.fechaHasta || ""}
          radius="sm"
          size="sm"
          variant="bordered"
        />
        <Button
          type="button"
          className="bg-[#0356ba] h-11  min-w-28 cursor-pointer text-sm text-white"
          onPress={findMascotas}
          isLoading={isLoading}
          isDisabled={isLoading}
          startContent={
            !isLoading && <RiSearchEyeFill className="text-xl text-white" />
          }
        >
          Buscar
        </Button>
      </div>
    </section>
  );
};

export default FiltroBusqueda;
