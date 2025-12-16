import {
  Autocomplete,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
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
import { RiImageAddFill, RiSearchEyeFill } from "react-icons/ri";
import type { Mascota } from "../../../../../type/mascotas.type";
import useSelectEspeciesRaza from "../../../../../hooks/SelectEspeciesRaza";
import { departamentos } from "../../../../../data/ubigeos/departamentos";
import { provincias } from "../../../../../data/ubigeos/provincias";
import { distritos } from "../../../../../data/ubigeos/distritos";

interface DataFilters {
  search: string | null;
}
interface Props {
  findMascotas: () => void;
  usuarios: User[];
  dataFilters: DataFilters;
  setDataFilters: (e: DataFilters) => void;
  findUsuarios: () => void;
}

const ModalAddMascota = ({
  findMascotas,
  usuarios,
  dataFilters,
  setDataFilters,
  findUsuarios,
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
  const [userId, setUserId] = useState<React.Key | null>("");

  const { file, preview, handleImageChange, clearImage } = useImagePreview();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const { register, handleSubmit, reset } = useForm<Mascota>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectDepartamento, setSelectDepartamento] = useState<string>("");
  const [selectProvincia, setSelectProvincia] = useState<string>("");
  const [selectDistrito, setSelectDistrito] = useState<string>("");

  const submit = async (data: Mascota) => {
    setLoading(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });
    formData.append("usuario_id", userId as string);
    formData.append("especie_id", selectEspecie as string);
    formData.append("mascota_raza_id", selectRaza as string);
    formData.append("departamento_id", selectDepartamento);
    formData.append("provincia_id", selectProvincia);
    formData.append("distrito_id", selectDistrito);

    // Si hay imagen, la agregamos
    if (file) {
      formData.append("imagen", file);
    }

    const url = `${import.meta.env.VITE_URL_API}/mascota`;
    await axios
      .post(url, formData, config)
      .then(() => {
        toast.success("Mascota registrada correctamente");
        findMascotas();
        reset();
        clearImage();
        onOpenChange();
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          err?.response?.data?.message ||
            "Hubo un error al registrar la  Mascota"
        );
      })
      .finally(() => setLoading(false));
  };

  const handleEspecie = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectEspecie(e.target.value);
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
        className="bg-[#0356ba] "
        size="sm"
        color="primary"
        startContent={<FaPlus />}
        onPress={onOpen}
      >
        Mascota
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader className="pb-0">Registrar Macota</ModalHeader>
          <Divider className="bg-orange-100 h-0.5" />
          <ModalBody className="max-h-[80vh] overflow-y-auto">
            <div className="w-full max-w-3xl flex items-end gap-1 ">
              <Input
                className=""
                classNames={inputClassNames}
                label="Buscar Usuario por nombre o email"
                labelPlacement="outside"
                name="NOMBRE APELLIDOS"
                type="string"
                placeholder="Buscar por Nombre Apellidos o email"
                onChange={(e) =>
                  setDataFilters({
                    ...dataFilters,
                    search: e.target.value || "",
                  })
                }
                value={dataFilters.search || ""}
                radius="sm"
                size="sm"
                id="correoUsuario"
                variant="bordered"
              />

              <Button
                type="submit"
                className=" bg-[#0356ba] h-9 min-w-[50px]  flex items-center justify-center cursor-pointer hover:bg-[#2776d8] transition-colors"
                onPress={findUsuarios}
                radius="sm"
              >
                <RiSearchEyeFill className="text-xl text-white" />
              </Button>
            </div>{" "}
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(submit)}
            >
              <Autocomplete
                isRequired
                className="w-full"
                inputProps={{
                  classNames: {
                    input: "text-[11px]",
                    inputWrapper: "min-h-9 border-1.5 border-neutral-400",
                    label: "pb-1 text-[11px] text-neutral-800 font-semibold",
                  },
                }}
                labelPlacement="outside"
                label="Seleccionar Usuario"
                placeholder="Seleccionar..."
                onSelectionChange={setUserId}
                variant="bordered"
                radius="sm"
                size="sm"
              >
                <>
                  <SelectItem key="" textValue="Seleccionar usuario">
                    <p className="text-[11px]">Seleccionar usuario</p>
                  </SelectItem>
                  {usuarios.map((usuario) => (
                    <SelectItem
                      key={usuario.id.toString()}
                      textValue={`${usuario.nombre} - ${usuario.email}`}
                    >
                      <p className="text-[11px]">
                        {usuario.nombre} - {usuario.email}
                      </p>
                    </SelectItem>
                  ))}
                </>
              </Autocomplete>
              <div className="w-full flex gap-4">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex  gap-1">
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
                    <Select
                      isRequired
                      className="w-56"
                      classNames={selectClassNames}
                      label="Sexo"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      placeholder="Seleccione sexo"
                      size="sm"
                      {...register("sexo")}
                    >
                      <SelectItem key="Macho" textValue="Macho">
                        <p className="text-[11px]">Macho</p>
                      </SelectItem>
                      <SelectItem key="Hembra" textValue="Hembra">
                        <p className="text-[11px]">Hembra</p>
                      </SelectItem>
                      <SelectItem key="Otro" textValue="Otros">
                        <p className="text-[11px]">Otro</p>
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="flex gap-1">
                    <Input
                      classNames={inputClassNames}
                      label="Microchip"
                      labelPlacement="outside"
                      placeholder="..."
                      variant="bordered"
                      {...register("cod_microchip")}
                      color="primary"
                      radius="sm"
                      size="sm"
                    />
                    <Input
                      isRequired
                      classNames={inputClassNames}
                      label="Fecha de Nacimiento"
                      labelPlacement="outside"
                      placeholder="..."
                      variant="bordered"
                      {...register("fecha_nacimiento")}
                      type="date"
                      color="primary"
                      radius="sm"
                      size="sm"
                    />
                    <Select
                      isRequired
                      classNames={selectClassNames}
                      label="Tamaño"
                      labelPlacement="outside"
                      variant="bordered"
                      radius="sm"
                      placeholder="Seleccione Tamaño"
                      size="sm"
                      {...register("tamano")}
                    >
                      <SelectItem key="Mediano" textValue="Mediano">
                        <p className="text-[11px]">Mediano</p>
                      </SelectItem>
                      <SelectItem key="Chico" textValue="Chico">
                        <p className="text-[11px]">Chico</p>
                      </SelectItem>
                      <SelectItem key="Grande" textValue="Grande">
                        <p className="text-[11px]">Grande</p>
                      </SelectItem>
                    </Select>
                  </div>
                </div>
                <div className="w-52 flex flex-col gap-1">
                  <p className="text-xs">Foto de la Mascota:</p>
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
              <div className="w-full flex gap-1">
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Color"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("color")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />
                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Calificacion"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  placeholder="Seleccione calificacion"
                  size="sm"
                  {...register("calificacion")}
                >
                  <SelectItem key="Rojo" textValue="Rojo">
                    <p className="text-[11px]">Rojo</p>
                  </SelectItem>
                  <SelectItem key="Verde" textValue="Verde">
                    <p className="text-[11px]">Verde</p>
                  </SelectItem>
                  <SelectItem key="Amarillo" textValue="Amarillo">
                    <p className="text-[11px]">Amarillo</p>
                  </SelectItem>
                  <SelectItem key="Naranja" textValue="Naranja">
                    <p className="text-[11px]">Naranja</p>
                  </SelectItem>
                  <SelectItem key="Azul" textValue="Azul">
                    <p className="text-[11px]">Azul</p>
                  </SelectItem>
                </Select>
                <Select
                  isRequired
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
                    <SelectItem
                      key={especie.id.toString()}
                      textValue={especie.title_es}
                      className="text-[6px]"
                    >
                      <p className="text-[11px]">{especie.title_es}</p>
                    </SelectItem>
                  ))}
                </Select>

                <Autocomplete
                  isRequired
                  className="w-full"
                  inputProps={{
                    classNames: {
                      input: "text-[11px]",
                      inputWrapper: "min-h-9 border-1.5 border-neutral-400",
                      label: "pb-1 text-[11px] text-neutral-800 font-semibold",
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
                    <SelectItem
                      key={raza.id.toString()}
                      textValue={raza.title_es}
                    >
                      <p className="text-[11px]">{raza.title_es}</p>
                    </SelectItem>
                  ))}
                </Autocomplete>
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
              <div className="w-full flex gap-1">
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Dirección"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("direccion")}
                  color="primary"
                  radius="sm"
                  size="sm"
                />
                <Select
                  className="w-70"
                  isRequired
                  classNames={selectClassNames}
                  label="Tipo de mascota"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  {...register("tipo_mascota")}
                >
                  <SelectItem key="PREMIUM" textValue="PREMIUM">
                    <p className="text-[11px]">PREMIUM</p>
                  </SelectItem>
                  <SelectItem key="CLASICO" textValue="CLASICO">
                    <p className="text-[11px]">CLASICO</p>
                  </SelectItem>
                </Select>
              </div>
              <div className="flex gap-1">
                <Textarea
                  classNames={inputClassNames}
                  label="Biografía"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("biografia")}
                  color="primary"
                  radius="sm"
                  size="sm"
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

export default ModalAddMascota;
