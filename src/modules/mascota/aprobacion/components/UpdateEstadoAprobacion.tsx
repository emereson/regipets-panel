import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import config from "../../../../utils/auth/getToken";
import Loading from "../../../../hooks/Loading";
import { selectClassNames } from "../../../../utils/classNames";
import type { Mascota } from "../../../../type/mascotas.type";

interface Props {
  findMascotas: () => void;
  selectedMascotaIds: number[];
  setSelectedMascotaIds: (ids: number[]) => void;
}

const UpdateEstadoAprobacion = ({
  findMascotas,
  selectedMascotaIds,
  setSelectedMascotaIds,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<Mascota>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const submit = async (data: Mascota) => {
    setLoading(true);

    const url = `${
      import.meta.env.VITE_URL_API
    }/mascota/editar-estados-aprobacion`;
    await axios
      .post(url, { ...data, mascotasIds: selectedMascotaIds }, config)
      .then(() => {
        toast.success("Mascota registrada correctamente");
        findMascotas();
        reset();
        onOpenChange();
        setSelectedMascotaIds([]);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            "Hubo un error al registrar la  Mascota"
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <section>
      {loading && <Loading />}

      <Button
        className="bg-[#0356ba] "
        size="sm"
        color="primary"
        onPress={onOpen}
      >
        Editar Estados
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          <ModalHeader className="pb-0 text-medium">
            Editar estados de aprobación de mascotas
          </ModalHeader>
          <Divider className="bg-orange-100 h-0.5" />
          <ModalBody className="max-h-[80vh] overflow-y-auto">
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(submit)}
            >
              <Select
                isRequired
                classNames={selectClassNames}
                label="Estado de Aprobación"
                labelPlacement="outside"
                variant="bordered"
                radius="sm"
                placeholder="Seleccionar..."
                size="sm"
                {...register("estado_verificacion")}
              >
                <SelectItem key="APROBADO" textValue="APROBADO">
                  <p className="text-[11px]">APROBADO</p>
                </SelectItem>
                <SelectItem key="PENDIENTE" textValue="PENDIENTE">
                  <p className="text-[11px]">PENDIENTE</p>
                </SelectItem>
                <SelectItem key="DENEGADO" textValue="DENEGADO">
                  <p className="text-[11px]">DENEGADO</p>
                </SelectItem>
              </Select>

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
                  Guardar
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UpdateEstadoAprobacion;
