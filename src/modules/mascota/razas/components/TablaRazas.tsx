import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import type { Especie, Raza } from "../../../../type/mascotas.type";
import {
  inputClassNames,
  selectClassNames,
  tableCellStyle,
  tableColumnStyle,
} from "../../../../utils/classNames";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";

import ModalAddRaza from "./crudRazas/ModalAddRaza";
import SkeletonTable from "../../../../hooks/SkeletonTable";
import ModalUpdateRaza from "./crudRazas/ModalUpdateRaza";
import ModalDeleteRaza from "./crudRazas/ModalDeleteRaza";
import { useAsyncList } from "@react-stately/data";

interface Props {
  especies: Especie[];
  findRazas: () => void;
  razas: Raza[];
  selectEspecie: string | null;
  setSelectEspecie: (e: string | null) => void;
  loadingRaza: boolean;
}

const ITEMS_PER_PAGE = 10;

const TablaRazas = ({
  especies,
  findRazas,
  razas,
  selectEspecie,
  setSelectEspecie,
  loadingRaza,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectRaza, setSelectRaza] = useState<Raza | null>(null);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");

  // Filtrar razas según búsqueda
  const filteredRazas = razas.filter((r) =>
    search.trim() === ""
      ? true
      : r.title_es.toLowerCase().includes(search.toLowerCase())
  );

  const list = useAsyncList<Raza>({
    async load({ cursor }) {
      // El cursor representa el índice desde donde cargar
      const startIndex = cursor ? parseInt(cursor) : 0;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      // Simular un pequeño delay para mostrar el loading
      await new Promise((resolve) => setTimeout(resolve, 300));

      const itemsToLoad = filteredRazas.slice(startIndex, endIndex);
      const nextCursor =
        endIndex < filteredRazas.length ? String(endIndex) : undefined;

      return {
        items: itemsToLoad,
        cursor: nextCursor,
      };
    },
  });

  // Recargar cuando cambien los filtros
  useEffect(() => {
    list.reload();
  }, [search, razas, selectEspecie]);

  const handleEdit = (raza: Raza) => {
    setModal("update");
    onOpen();
    setSelectRaza(raza);
  };

  const handleDelete = (raza: Raza) => {
    setModal("delete");
    onOpen();
    setSelectRaza(raza);
  };

  const handleEspecie = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectEspecie(e.target.value || "");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const hasMore = list.items.length < filteredRazas.length;

  return (
    <section className="w-full  relative flex flex-col gap-2 overflow-hidden">
      <div className="w-full flex justify-between items-end">
        <h2 className="font-bold ">Razas</h2>
        <ModalAddRaza especies={especies} findRazas={findRazas} />
      </div>

      <div className="w-full flex gap-2">
        {especies && (
          <Select
            className="w-52"
            classNames={selectClassNames}
            labelPlacement="outside"
            variant="bordered"
            label="Especie"
            placeholder="Seleccionar especie"
            radius="sm"
            size="sm"
            selectedKeys={[selectEspecie || ""]}
            defaultSelectedKeys={[selectEspecie || ""]}
            onChange={handleEspecie}
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
        )}
        <Input
          className="w-52"
          classNames={inputClassNames}
          label="Nombre de la raza"
          labelPlacement="outside"
          placeholder="..."
          variant="bordered"
          color="primary"
          radius="sm"
          size="sm"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {loadingRaza ? (
        <SkeletonTable
          columns={["Nro", "Especie", "Título", "Descripción", "Acciones"]}
          rows={5}
        />
      ) : (
        <Table
          aria-label="Tabla de razas"
          classNames={{
            base: "max-h-[600px] overflow-auto rounded-xl",
            table: "min-h-[50px]",
            wrapper: "p-0",
          }}
          isHeaderSticky
          isStriped
          radius="sm"
        >
          <TableHeader>
            <TableColumn className={tableColumnStyle}>Nro</TableColumn>
            <TableColumn className={`${tableColumnStyle}`}>ESPECIE</TableColumn>
            <TableColumn className={`${tableColumnStyle}`}>TITULO</TableColumn>
            <TableColumn className={`${tableColumnStyle}`}>
              DESCRIPCIÓN
            </TableColumn>
            <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
          </TableHeader>

          <TableBody
            items={list.items}
            isLoading={list.isLoading && list.items.length === 0}
            loadingContent={<Spinner label="Cargando razas..." />}
          >
            {(raza) => (
              <TableRow key={raza.id}>
                <TableCell className={tableCellStyle}>
                  {filteredRazas.findIndex((r) => r.id === raza.id) + 1}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {raza.especie?.title_es}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {raza.title_es}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {raza.description_es}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  <div className="flex gap-1">
                    <MdEdit
                      className="text-xl text-blue-700 cursor-pointer"
                      onClick={() => handleEdit(raza)}
                    />
                    <MdDelete
                      className="text-xl text-red-600 cursor-pointer"
                      onClick={() => handleDelete(raza)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {hasMore ? (
        <div className="flex w-full justify-center">
          <Button
            isDisabled={list.isLoading}
            size="sm"
            onPress={list.loadMore}
            color="primary"
          >
            {list.isLoading && <Spinner color="white" size="sm" />}
            {list.isLoading ? "Cargando..." : "Cargar más"}
          </Button>
        </div>
      ) : list.items.length > 0 ? (
        <div className="flex w-full justify-center py-2">
          <p className="text-small text-default-400">
            Mostrando {list.items.length} de {filteredRazas.length} razas
          </p>
        </div>
      ) : null}
      {modal === "update" && selectRaza && (
        <ModalUpdateRaza
          key={selectRaza.id}
          especies={especies}
          findRazas={findRazas}
          selectRaza={selectRaza}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
      {modal === "delete" && selectRaza && (
        <ModalDeleteRaza
          key={selectRaza.id}
          findRazas={findRazas}
          selectRaza={selectRaza}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
    </section>
  );
};

export default TablaRazas;
