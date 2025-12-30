import {
  Button,
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
import { useRef, useState } from "react";
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
import { useImagePreview } from "../../../../../hooks/useImagePreview";
import { RiImageAddFill } from "react-icons/ri";

interface Props {
  findConvenios: () => void;
}

const ModalAddConvenio = ({ findConvenios }: Props) => {
  const { register, handleSubmit, reset } = useForm<Convenio>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { file, preview, handleImageChange, clearImage } = useImagePreview();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };
  const [loading, setLoading] = useState(false);
  const [selectDepartamento, setSelectDepartamento] = useState<string>("");
  const [selectProvincia, setSelectProvincia] = useState<string>("");
  const [selectDistrito, setSelectDistrito] = useState<string>("");

  const submit = async (data: Convenio) => {
    setLoading(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });
    // formData.append("nombre_convenio", data.nombre_convenio);
    // formData.append("direccion", data.direccion);
    // formData.append("telefono", data.telefono);
    formData.append("departamento_id", selectDepartamento);
    formData.append("provincia_id", selectProvincia);
    formData.append("distrito_id", selectDistrito);
    // formData.append("categoria_convenio", data.categoria_convenio);
    // formData.append("beneficio_convenio", data.beneficio_convenio);

    // Si hay imagen, la agregamos
    if (file) {
      formData.append("imagen", file);
    }
    try {
      const url = `${import.meta.env.VITE_URL_API}/convenios`;
      await axios.post(url, formData, config);

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

  const CATEGORIAS = [
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
          <ModalHeader>Agregar Convenio</ModalHeader>
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

              <div className="w-full flex items-start gap-1">
                <Select
                  isRequired
                  classNames={selectClassNames}
                  labelPlacement="outside"
                  variant="bordered"
                  label="Categoria"
                  placeholder="Seleccionar..."
                  {...register("categoria_convenio")}
                  radius="sm"
                  size="sm"
                >
                  {CATEGORIAS.map((categoria) => (
                    <SelectItem key={categoria} textValue={categoria}>
                      <p className="text-[12px]">{categoria}</p>
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  classNames={inputClassNames}
                  isRequired
                  label="Beneficio"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("beneficio_convenio")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />
                <div className="w-52 flex flex-col gap-1">
                  <p className="text-xs">Logo:</p>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md cursor-pointer m-auto"
                      onClick={openFileDialog}
                    />
                  )}
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden" // <-- ocultamos el input
                  />

                  {!preview && (
                    <RiImageAddFill
                      className="text-5xl cursor-pointer m-auto"
                      onClick={openFileDialog}
                    />
                  )}

                  {preview && (
                    <Button
                      className="w-min"
                      color="danger"
                      type="button"
                      onPress={clearImage}
                      size="sm"
                    >
                      Quitar imagen
                    </Button>
                  )}
                </div>
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
