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
import type { User } from "../../../../../type/user";
import { useImagePreview } from "../../../../../hooks/useImagePreview";
import { RiImageAddFill } from "react-icons/ri";

interface Props {
  findUsuarios: () => void;
}

const ModalAddUsuario = ({ findUsuarios }: Props) => {
  const { file, preview, handleImageChange, clearImage } = useImagePreview();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const { register, handleSubmit, reset } = useForm<User>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const submit = async (data: User) => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    // Si hay imagen, la agregamos
    if (file) {
      formData.append("imagen", file);
    }

    const url = `${import.meta.env.VITE_URL_API}/user/signup`;
    await axios
      .post(url, formData, {
        ...config,
        headers: { ...config.headers, "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Usuario creado correctamente");
        findUsuarios();
        reset();
        clearImage();

        onOpenChange();
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          err?.response?.data?.message || "Hubo un error al crear el usuario"
        );
      })
      .finally(() => setLoading(false));
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
        Usuario
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader>Registrar Usuario</ModalHeader>
          <ModalBody className="max-h-[80vh] overflow-y-auto">
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(submit)}
            >
              <div className="w-full flex gap-2">
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Nombre"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("nombre")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Apellidos"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("apellido")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />
              </div>
              <div className="w-full flex gap-2">
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Correo Electrónico"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("email")}
                  color="primary"
                  radius="sm"
                  type="email"
                  size="sm"
                />
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Número de teléfono"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("celular")}
                  maxLength={9}
                  minLength={9}
                  color="primary"
                  radius="sm"
                  type="tel"
                  size="sm"
                />
              </div>
              <div className="w-full flex gap-2">
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Fecha de nacimiento"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("fecha_nacimiento")}
                  color="primary"
                  radius="sm"
                  type="date"
                  size="sm"
                />
                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Sexo"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  placeholder="Seleccione sexo"
                  size="sm"
                  {...register("sexo")}
                >
                  <SelectItem key="Masculino" textValue="Masculino">
                    <p className="text-[11px]">Masculino</p>
                  </SelectItem>
                  <SelectItem key="Femenino" textValue="Femenino">
                    <p className="text-[11px]">Femenino</p>
                  </SelectItem>
                  <SelectItem key="Otro" textValue="Otros">
                    <p className="text-[11px]">Otro</p>
                  </SelectItem>
                </Select>
                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Rol"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  placeholder="Seleccione un Rol"
                  size="sm"
                  {...register("rol")}
                >
                  <SelectItem key="Admin" textValue="Admin">
                    <p className="text-[11px]">Admin</p>
                  </SelectItem>
                  <SelectItem key="Cliente RUMP" textValue="Cliente RUMP">
                    <p className="text-[11px]">Cliente RUMP</p>
                  </SelectItem>
                  <SelectItem key="Cliente Premium" textValue="Cliente Premium">
                    <p className="text-[11px]">Cliente Premium</p>
                  </SelectItem>
                  <SelectItem key="Embajador" textValue="Embajador">
                    <p className="text-[11px]">Embajador</p>
                  </SelectItem>
                  <SelectItem key="Aliado" textValue="Aliado">
                    <p className="text-[11px]">Aliado</p>
                  </SelectItem>
                  <SelectItem key="Gobierno" textValue="Gobierno">
                    <p className="text-[11px]">Gobierno</p>
                  </SelectItem>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs">Foto del Usuario:</p>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md cursor-pointer"
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
                {/* <Button
                  color="primary"
                  type="button"
                  onPress={openFileDialog}
                  size="sm"
                >
                  {file ? "Cambiar imagen" : "Seleccionar imagen"}
                </Button> */}
                {!preview && (
                  <RiImageAddFill
                    className="text-5xl cursor-pointer"
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

export default ModalAddUsuario;
