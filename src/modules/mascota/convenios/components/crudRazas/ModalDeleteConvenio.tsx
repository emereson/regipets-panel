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
import type { Convenio } from "../../../../../type/convenios.type";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  findConvenios: () => void;
  selectConvenio: Convenio;
}

const ModalDeleteConvenio = ({
  isOpen,
  onOpenChange,
  findConvenios,
  selectConvenio,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = () => {
    setLoading(true);

    const url = `${import.meta.env.VITE_URL_API}/convenios/${
      selectConvenio.id
    }`;

    axios
      .delete(url, config)
      .then(() => {
        findConvenios();
        toast.success("Convenio eliminado correctamente");
      })
      .catch(() => {
        toast.error("Ocurrió un error al eliminar el convenio");
      })
      .finally(() => {
        setLoading(false);
        onOpenChange();
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {loading && <Loading />}

      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex gap-1 text-sm">
              Eliminar convenio:{" "}
              <span className="font-semibold">
                {selectConvenio.nombre_convenio}
              </span>
            </ModalHeader>

            <ModalBody>
              <p className="text-sm text-gray-600">
                Al eliminar este convenio, toda la información asociada se
                perderá de forma permanente.
                <br />
                ¿Estás seguro de que deseas continuar?
              </p>

              <div className="w-full flex items-center justify-end gap-3 pt-4">
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onPress={onOpenChange}
                >
                  Cancelar
                </Button>

                <Button color="danger" size="sm" onPress={handleDelete}>
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

export default ModalDeleteConvenio;
