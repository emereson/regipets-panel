import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { Referido } from "../../../../type/referidos.type";
import config from "../../../../utils/auth/getToken";
import Loading from "../../../../hooks/Loading";
import { selectClassNames } from "../../../../utils/classNames";

interface Props {
  findReferidos: () => void;
  selectReferido: Referido;
  onOpenChange: (e: boolean) => void;
  isOpen: boolean;
}

const ModalUpdateReferido = ({
  findReferidos,
  selectReferido,
  onOpenChange,
  isOpen,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<Referido>();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (data: Referido) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/referido/${selectReferido.id}`;

    axios
      .patch(url, data, config)
      .then(() => {
        findReferidos();
        toast.success("El estado se edito correctamente");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || "Hubo un error al editar El estado"
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
            <ModalHeader className="flex flex-col gap-1 text-md">
              Editar Estado del referido
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(submit)}
              >
                <div className="w-full flex gap-4">
                  <Select
                    classNames={selectClassNames}
                    label="Estado"
                    labelPlacement="outside"
                    placeholder="Seleccionar..."
                    variant="bordered"
                    radius="sm"
                    size="sm"
                    defaultSelectedKeys={[selectReferido.estado]}
                    {...register("estado")}
                  >
                    <SelectItem key="cobrado" textValue="cobrado">
                      <p className="text-xs">cobrado</p>
                    </SelectItem>
                    <SelectItem key="pendiente" textValue="pendiente">
                      <p className="text-xs">pendiente</p>
                    </SelectItem>
                  </Select>
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

export default ModalUpdateReferido;
