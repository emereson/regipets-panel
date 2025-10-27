import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import type { Especie } from "../../../../../type/mascotas.type";
import { toast } from "sonner";
import axios from "axios";
import config from "../../../../../utils/auth/getToken";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { inputClassNames } from "../../../../../utils/classNames";
import Loading from "../../../../../hooks/Loading";
interface Props {
  findMascotas: () => void;
}
const ModalAddEspecie = ({ findMascotas }: Props) => {
  const { register, handleSubmit, reset } = useForm<Especie>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const submit = (data: Especie) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/especie`;

    axios
      .post(url, data, config)
      .then(() => {
        findMascotas();
        toast.success("La especie se agrego correctamente");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || "Hubo un error al crear La especie"
        );
      })
      .finally(() => {
        setLoading(false);
        onOpenChange();
        reset();
      });
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
        ESPECIE
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Especies
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit(submit)}
                >
                  <div className="w-full flex gap-4">
                    <Input
                      className="w-full"
                      isRequired
                      classNames={inputClassNames}
                      labelPlacement="outside"
                      label="Titulo de la Especie"
                      placeholder="..."
                      variant="bordered"
                      {...register("title_es")}
                      color="primary"
                      radius="sm"
                      size="sm"
                      type="text"
                    />
                  </div>

                  <div className="w-full flex items-center justify-end gap-3 p-4">
                    <Button
                      color="danger"
                      type="button"
                      onPress={() => {
                        onOpenChange();
                        reset();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Agregar
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ModalAddEspecie;
