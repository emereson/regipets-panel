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
  useDisclosure,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
  findConvenios: () => void;
}

const ModalAddConvenio = ({ findConvenios }: Props) => {
  const { register, handleSubmit, reset } = useForm<Convenio>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectDepartamento, setSelectDepartamento] = useState<string>("");
  const [selectProvincia, setSelectProvincia] = useState<string>("");
  const [selectDistrito, setSelectDistrito] = useState<string>("");
  const [isSelected, setIsSelected] = useState(false);

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
      const url = `${import.meta.env.VITE_URL_API}/convenios`;
      await axios.post(url, newData, config);

      toast.success("El convenio se agregó correctamente");
      findConvenios();
      onOpenChange();
      reset();
    } catch {
      toast.error("Hubo un error al crear el convenio");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <section>
      {loading && <Loading />}

      <Button
        size="sm"
        color="primary"
        startContent={<FaPlus />}
        onPress={onOpen}
      >
        Convenio
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <ModalHeader>Agregar Raza</ModalHeader>
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
                  placeholder="..."
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
                  label="telefono"
                  labelPlacement="outside"
                  placeholder="..."
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
                  placeholder="..."
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
                    <SelectItem
                      key={departamento.id.toString()}
                      textValue={departamento.Departamento}
                      className="text-[6px]"
                    >
                      <p className="text-[12px]">{departamento.Departamento}</p>
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  isRequired
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
                  {provincias
                    .filter(
                      (provincia) =>
                        provincia.UbigeoId === Number(selectDepartamento)
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
                </Select>
                <Select
                  isRequired
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
                  {distritos
                    .filter(
                      (distrito) =>
                        distrito.UbigeoProvId === Number(selectProvincia)
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
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onOpenChange();
                    reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isDisabled={loading}>
                  Agregar
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ModalAddConvenio;
