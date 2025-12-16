import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import config from "../../../../../utils/auth/getToken";
import Loading from "../../../../../hooks/Loading";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../../utils/classNames";
import type { Convenio } from "../../../../../type/convenios.type";
import { departamentos } from "../../../../../data/ubigeos/departamentos";
import { provincias } from "../../../../../data/ubigeos/provincias";
import { distritos } from "../../../../../data/ubigeos/distritos";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  findConvenios: () => void;
  selectConvenio: Convenio;
}

const ModalUpdateConvenio = ({
  isOpen,
  onOpenChange,
  findConvenios,
  selectConvenio,
}: Props) => {
  const { register, handleSubmit, reset, setValue } = useForm<Convenio>();
  const [loading, setLoading] = useState(false);

  const [selectDepartamento, setSelectDepartamento] = useState<string>("");
  const [selectProvincia, setSelectProvincia] = useState<string>("");
  const [selectDistrito, setSelectDistrito] = useState<string>("");

  const [isSelected, setIsSelected] = useState<boolean>(false);

  /* ▶ Precargar datos */
  useEffect(() => {
    if (!selectConvenio) return;

    setValue("nombre_convenio", selectConvenio.nombre_convenio);
    setValue("direccion", selectConvenio.direccion);
    setValue("telefono", selectConvenio.telefono);

    setIsSelected(selectConvenio.punto_autorizado);

    setSelectDepartamento(selectConvenio.departamento_id?.toString() || "");
    setSelectProvincia(selectConvenio.provincia_id?.toString() || "");
    setSelectDistrito(selectConvenio.distrito_id?.toString() || "");
  }, [selectConvenio, setValue]);

  const submit = async (data: Convenio) => {
    setLoading(true);

    const newData = {
      nombre_convenio: data.nombre_convenio,
      direccion: data.direccion,
      telefono: data.telefono,
      punto_autorizado: isSelected,
      departamento_id: selectDepartamento,
      provincia_id: selectProvincia,
      distrito_id: selectDistrito,
    };

    try {
      const url = `${import.meta.env.VITE_URL_API}/convenios/${
        selectConvenio.id
      }`;
      await axios.patch(url, newData, config);

      toast.success("Convenio actualizado correctamente");
      findConvenios();
      onOpenChange();
      reset();
    } catch {
      toast.error("Error al actualizar el convenio");
    } finally {
      setLoading(false);
    }
  };

  const handleDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectDepartamento(value);
    setSelectProvincia("");
    setSelectDistrito("");
  };

  const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectProvincia(value);
    setSelectDistrito("");
  };

  const handleDistritos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDistrito(e.target.value);
  };

  return (
    <>
      {loading && <Loading />}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <ModalHeader>Editar Convenio</ModalHeader>

          <ModalBody>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(submit)}
            >
              <div className="flex gap-1">
                <Input
                  classNames={inputClassNames}
                  isRequired
                  label="Nombre del Convenio"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("nombre_convenio")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />

                <Input
                  className="w-[300px]"
                  classNames={inputClassNames}
                  isRequired
                  label="Teléfono"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("telefono")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />
              </div>

              <div className="flex gap-4 items-end">
                <Input
                  classNames={inputClassNames}
                  isRequired
                  label="Dirección"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("direccion")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />

                <div className="flex flex-col">
                  <p className="text-nowrap text-[11px]">
                    Punto <br /> Autorizado
                  </p>
                  <Checkbox
                    size="lg"
                    color="danger"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  />
                </div>
              </div>

              <div className="w-full flex gap-1">
                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Departamento"
                  labelPlacement="outside"
                  variant="bordered"
                  selectedKeys={selectDepartamento ? [selectDepartamento] : []}
                  onChange={handleDepartamento}
                >
                  {departamentos.map((d) => (
                    <SelectItem
                      key={d.id.toString()}
                      textValue={d.Departamento}
                    >
                      <p className="text-[12px]">{d.Departamento}</p>
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Provincia"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled={!selectDepartamento}
                  selectedKeys={selectProvincia ? [selectProvincia] : []}
                  onChange={handleProvincia}
                >
                  {provincias
                    .filter((p) => p.UbigeoId === Number(selectDepartamento))
                    .map((p) => (
                      <SelectItem key={p.id.toString()} textValue={p.Provincia}>
                        <p className="text-[11px]">{p.Provincia}</p>
                      </SelectItem>
                    ))}
                </Select>

                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Distrito"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled={!selectProvincia}
                  selectedKeys={selectDistrito ? [selectDistrito] : []}
                  onChange={handleDistritos}
                >
                  {distritos
                    .filter((d) => d.UbigeoProvId === Number(selectProvincia))
                    .map((d) => (
                      <SelectItem key={d.id.toString()} textValue={d.Distrito}>
                        <p className="text-[11px]">{d.Distrito}</p>
                      </SelectItem>
                    ))}
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button color="danger" variant="flat" onPress={onOpenChange}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isDisabled={loading}>
                  Actualizar
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUpdateConvenio;
