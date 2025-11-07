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
  useDisclosure,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import type { Especie, Raza } from "../../../../../type/mascotas.type";
import config from "../../../../../utils/auth/getToken";
import Loading from "../../../../../hooks/Loading";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../../utils/classNames";

interface Props {
  especies: Especie[];
  findRazas: () => void;
}

const ModalAddRaza = ({ especies, findRazas }: Props) => {
  const { register, handleSubmit, reset } = useForm<Raza>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const submit = async (data: Raza) => {
    if (!data.especie_id) {
      toast.warning("Selecciona una especie antes de agregar la raza");
      return;
    }

    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_URL_API}/raza`;
      await axios.post(url, data, config);

      toast.success("La raza se agregó correctamente");
      findRazas();
      onOpenChange();
      reset();
    } catch {
      toast.error("Hubo un error al crear la raza");
    } finally {
      setLoading(false);
    }
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
        Raza
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          <ModalHeader>Agregar Raza</ModalHeader>
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
              />

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

export default ModalAddRaza;
