import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
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
  const { register, handleSubmit, reset } = useForm<Convenio>({
    defaultValues: selectConvenio,
  });
  const [loading, setLoading] = useState(false);
  const { file, preview, handleImageChange, clearImage } = useImagePreview();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const [selectDepartamento, setSelectDepartamento] = useState<string>("");
  const [selectProvincia, setSelectProvincia] = useState<string>("");
  const [selectDistrito, setSelectDistrito] = useState<string>("");

  /* ▶ Precargar datos */
  useEffect(() => {
    if (!selectConvenio) return;

    setSelectDepartamento(selectConvenio.departamento_id?.toString() || "");
    setSelectProvincia(selectConvenio.provincia_id?.toString() || "");
    setSelectDistrito(selectConvenio.distrito_id?.toString() || "");
  }, [selectConvenio]);

  const submit = async (data: Convenio) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("nombre_convenio", data.nombre_convenio);
    formData.append("direccion", data.direccion);
    formData.append("link_direccion", data.link_direccion);
    formData.append("telefono", data.telefono);
    formData.append("departamento_id", selectDepartamento);
    formData.append("provincia_id", selectProvincia);
    formData.append("distrito_id", selectDistrito);
    formData.append("categoria_convenio", data.categoria_convenio);
    formData.append("beneficio_convenio", data.beneficio_convenio);

    // Si hay imagen, la agregamos
    if (file) {
      formData.append("imagen", file);
    }

    try {
      const url = `${import.meta.env.VITE_URL_API}/convenios/${
        selectConvenio.id
      }`;
      await axios.patch(url, formData, config);

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
              <Input
                classNames={inputClassNames}
                isRequired
                label="Link de la Dirección"
                labelPlacement="outside"
                placeholder="..."
                variant="bordered"
                {...register("link_direccion")}
                color="primary"
                radius="sm"
                size="sm"
              />
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
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md cursor-pointer m-auto"
                      onClick={openFileDialog}
                    />
                  ) : selectConvenio.logo_convenio ? (
                    <img
                      src={
                        `${import.meta.env.VITE_URL_IMAGE}/${
                          selectConvenio.logo_convenio
                        }` || "/logo.webp"
                      }
                      alt="Mascota"
                      className="w-32 h-32 object-cover rounded-md cursor-pointer m-auto"
                      onClick={openFileDialog}
                    />
                  ) : (
                    <RiImageAddFill
                      className="text-5xl cursor-pointer m-auto"
                      onClick={openFileDialog}
                    />
                  )}

                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {(preview || selectConvenio.logo_convenio) && (
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
