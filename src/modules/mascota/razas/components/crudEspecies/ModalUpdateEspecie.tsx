import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
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
  selectEspecie: Especie;
  onOpenChange: (e: boolean) => void;
  isOpen: boolean;
}

const ModalUpdateEspecie = ({
  findMascotas,
  selectEspecie,
  onOpenChange,
  isOpen,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<Especie>();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (data: Especie) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/especie/${selectEspecie.id}`;

    axios
      .patch(url, data, config)
      .then(() => {
        findMascotas();
        toast.success("La especie se edito correctamente");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || "Hubo un error al editar La especie"
        );
      })
      .finally(() => {
        setLoading(false);
        onOpenChange(false);
        reset();
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {loading && <Loading />}
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Especie
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
                    defaultValue={selectEspecie.title_es}
                  />
                </div>

                <div className="w-full flex items-center justify-end gap-3 p-4">
                  <Button
                    color="danger"
                    type="button"
                    onPress={() => {
                      onOpenChange(false);
                      reset();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Guardar
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

export default ModalUpdateEspecie;
