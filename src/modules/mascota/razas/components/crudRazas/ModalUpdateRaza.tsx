import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import type { Especie, Raza } from "../../../../../type/mascotas.type";
import { toast } from "sonner";
import axios from "axios";
import config from "../../../../../utils/auth/getToken";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../../utils/classNames";
import Loading from "../../../../../hooks/Loading";

interface Props {
  especies: Especie[];
  findRazas: () => void;
  selectRaza: Raza;
  onOpenChange: (e: boolean) => void;
  isOpen: boolean;
}

const ModalUpdateRaza = ({
  especies,
  findRazas,
  selectRaza,
  onOpenChange,
  isOpen,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<Raza>();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (data: Raza) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/raza/${selectRaza.id}`;

    axios
      .patch(url, data, config)
      .then(() => {
        findRazas();
        toast.success("La raza se edito correctamente");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Hubo un error al editar La raza");
      })
      .finally(() => {
        setLoading(false);
        onOpenChange(false);
        reset();
      });
  };
  console.log(selectRaza);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {loading && <Loading />}
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar raza {selectRaza.title_es}
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(submit)}
              >
                <Select
                  classNames={selectClassNames}
                  isRequired
                  label="Especie"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  placeholder="Seleccione una especie"
                  size="sm"
                  {...register("especie_id")}
                  defaultSelectedKeys={[`${selectRaza.especie_id}`]}
                >
                  <>
                    {especies.map((especie) => (
                      <SelectItem
                        key={especie.id}
                        textValue={especie.title_es}
                        className="text-[6px]"
                      >
                        <p className="text-[11px]">{especie.title_es}</p>
                      </SelectItem>
                    ))}
                  </>
                </Select>

                <Input
                  classNames={inputClassNames}
                  isRequired
                  label="Nombre de la raza"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("title_es")}
                  color="primary"
                  radius="sm"
                  size="sm"
                  defaultValue={selectRaza.title_es}
                />

                <Textarea
                  classNames={inputClassNames}
                  label="Descripción de la raza"
                  labelPlacement="outside"
                  placeholder="..."
                  variant="bordered"
                  {...register("description_es")}
                  color="primary"
                  radius="sm"
                  size="sm"
                  defaultValue={selectRaza.description_es}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      onOpenChange(false);
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdateRaza;
