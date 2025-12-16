import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { toast } from "sonner";
import axios from "axios";
import config from "../../../../../utils/auth/getToken";
import { useState } from "react";
import Loading from "../../../../../hooks/Loading";
import type { User } from "../../../../../type/user";

interface Props {
  usuario: User;
  findUsuarios: () => void;
  isOpen: boolean;
  onOpenChange: (e?: boolean) => void;
}

const ModalDeleteUsuario = ({
  usuario,
  findUsuarios,
  isOpen,
  onOpenChange,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/user/${usuario.id}`;

    axios
      .delete(url, config)
      .then(() => {
        findUsuarios();
        toast.success("El usuario se elimino correctamente");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || "Hubo un error al eliminar La especie"
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
            <ModalHeader className="flex flex-col gap-1 text-md">
              Eliminar al usuario {usuario.nombre} {usuario.apellido}
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-end gap-3 p-4">
                <Button
                  color="primary"
                  type="button"
                  onPress={() => {
                    onOpenChange(false);
                  }}
                  size="sm"
                >
                  Cancelar
                </Button>
                <Button color="danger" onPress={handleDelete} size="sm">
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

export default ModalDeleteUsuario;
