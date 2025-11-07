import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import type { Raza } from "../../../../../type/mascotas.type";
import { toast } from "sonner";
import axios from "axios";
import config from "../../../../../utils/auth/getToken";
import { useState } from "react";
import Loading from "../../../../../hooks/Loading";

interface Props {
  findRazas: () => void;
  selectRaza: Raza;
  onOpenChange: (e: boolean) => void;
  isOpen: boolean;
}

const ModalDeleteRaza = ({
  findRazas,
  selectRaza,
  onOpenChange,
  isOpen,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/raza/${selectRaza.id}`;

    axios
      .delete(url, config)
      .then(() => {
        findRazas();
        toast.success("La raza se elimino correctamente");
      })
      .catch(() => {
        toast.error("Hubo un error al eliminar La raza");
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
              Eliminar la raza {selectRaza.title_es}
            </ModalHeader>
            <ModalBody>
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

export default ModalDeleteRaza;
