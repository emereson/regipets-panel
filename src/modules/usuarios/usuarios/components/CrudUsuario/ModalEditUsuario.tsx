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
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
import { onInputNumber } from "../../../../../utils/onInputs";

interface Props {
  usuario: User;
  findUsuarios: () => void;
  isOpen: boolean;
  onOpenChange: (e?: boolean) => void;
}

const ModalEditUsuario = ({
  usuario,
  findUsuarios,
  isOpen,
  onOpenChange,
}: Props) => {
  const { file, preview, handleImageChange, clearImage } = useImagePreview();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const { register, handleSubmit, reset } = useForm<User>();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

    const url = `${import.meta.env.VITE_URL_API}/user/${usuario.id}`;
    await axios
      .patch(url, formData, {
        ...config,
        headers: { ...config.headers, "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Usuario editado correctamente");
        findUsuarios();
        reset();
        clearImage();
        onOpenChange(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          err?.response?.data?.message || "Hubo un error al editar el usuario"
        );
      })
      .finally(() => setLoading(false));
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  1;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      {loading && <Loading />}

      <ModalContent>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody className="max-h-[80vh] overflow-y-auto">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
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
                defaultValue={usuario.nombre}
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
                defaultValue={usuario.apellido}
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
                defaultValue={usuario.email}
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
                onInput={onInputNumber}
                defaultValue={usuario.celular}
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
                defaultValue={usuario.fecha_nacimiento}
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
                defaultSelectedKeys={[usuario.sexo]}
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
                defaultSelectedKeys={[usuario.rol]}
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

              {!preview && usuario.foto && (
                <img
                  className="w-16 h-16  cursor-pointer rounded-md hover:scale-105 duration-300"
                  src={
                    `${import.meta.env.VITE_URL_IMAGE}/${usuario.foto}` ||
                    "/logo.webp"
                  }
                  onClick={openFileDialog}
                />
              )}
              {!preview && !usuario.foto && (
                <Button
                  className="w-fit"
                  color="primary"
                  type="button"
                  onPress={openFileDialog}
                  size="sm"
                >
                  {file ? "Cambiar imagen" : "Seleccionar imagen"}
                </Button>
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
              <Input
                classNames={inputClassNames}
                label="Contraseña Nueva"
                labelPlacement="outside"
                variant="bordered"
                placeholder="..."
                {...register("password")}
                color="primary"
                radius="sm"
                size="sm"
                id="passwordUsuario"
                type={isVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-xl text-blue-600 pointer-events-none flex-shrink-0" />
                    ) : (
                      <FaEye className="text-xl text-blue-600 pointer-events-none flex-shrink-0" />
                    )}
                  </button>
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  onOpenChange();
                  reset();
                }}
                size="sm"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                isDisabled={loading}
                size="sm"
              >
                Guardar
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditUsuario;
