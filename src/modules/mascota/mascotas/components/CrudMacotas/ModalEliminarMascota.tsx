import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import config from "../../../../../utils/auth/getToken";
import Loading from "../../../../../hooks/Loading";
import type { Mascota } from "../../../../../type/mascotas.type";
interface Props {
  mascota: Mascota;
  findMascotas: () => void;
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

const ModalEliminarMascota = ({
  mascota,
  findMascotas,
  isOpen,
  onOpenChange,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/mascota/${mascota.id}`;

    axios
      .delete(url, config)
      .then(() => {
        findMascotas();
        toast.success("La mascota se elimino correctamente");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || "Hubo un error al eliminar la mascota"
        );
      })
      .finally(() => {
        setLoading(false);
        onOpenChange(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {loading && <Loading />}
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Eliminar Mascota {mascota.nombre}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm font-light">
                Esta acción eliminará todos los datos de la mascota de manera
                permanente. Una vez borrados, no podrán recuperarse.
              </p>
              <div className="w-full flex items-center justify-end gap-3 p-4">
                <Button
                  color="primary"
                  type="button"
                  onPress={() => {
                    onOpenChange(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Eliminar
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEliminarMascota;
