import { useCallback, useEffect, useState } from "react";
import type { User } from "../../../../type/user";
import axios from "axios";
import config from "../../../../utils/auth/getToken";
import { Button, Input, Select, SelectItem, Spinner } from "@heroui/react";
import { RiSearchEyeFill } from "react-icons/ri";
import {
  inputClassNames,
  selectClassNames,
} from "../../../../utils/classNames";

interface Props {
  selectUsuario: string | null;
  setSelectUsuario: (value: string | null) => void;
}

export default function FiltroReferidos({
  selectUsuario,
  setSelectUsuario,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const findUsuarios = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());

      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_API}/user?${params.toString()}`,
        config
      );

      setUsuarios(data.users || []);
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      setUsuarios([]);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    findUsuarios();
  }, [findUsuarios]);

  return (
    <section className="w-full max-w-xl  flex flex-col gap-4">
      {/* 🔍 Filtro */}
      <form
        className="w-full flex items-end gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          findUsuarios();
        }}
      >
        <Input
          classNames={inputClassNames}
          label="Nombre, email o celular"
          labelPlacement="outside"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          radius="sm"
          size="sm"
          variant="bordered"
        />

        <Button
          type="submit"
          className="bg-[#0356ba] h-9 min-w-[50px] hover:bg-[#2776d8]"
          radius="sm"
          isDisabled={isLoading}
        >
          <RiSearchEyeFill className="text-xl text-white" />
        </Button>
      </form>

      {/* 👤 Selector */}
      {isLoading ? (
        <Spinner size="sm" />
      ) : usuarios.length > 0 ? (
        <Select
          classNames={selectClassNames}
          label="Seleccionar usuario"
          labelPlacement="outside"
          placeholder="Seleccionar..."
          variant="bordered"
          radius="sm"
          size="sm"
          selectedKeys={selectUsuario ? [selectUsuario] : []}
          onChange={(e) => setSelectUsuario(e.target.value || null)}
        >
          {usuarios.map((user) => (
            <SelectItem
              key={user.id}
              textValue={`${user.nombre} ${user.apellido}`}
            >
              <p className="text-xs">
                {user.nombre} {user.apellido}
              </p>
            </SelectItem>
          ))}
        </Select>
      ) : (
        <p className="text-sm text-gray-500">No se encontraron usuarios</p>
      )}
    </section>
  );
}
