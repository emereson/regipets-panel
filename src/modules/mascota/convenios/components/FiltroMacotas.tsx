import { Button, Select, SelectItem } from "@heroui/react";
import { selectClassNames } from "../../../../utils/classNames";
import { RiSearchEyeFill } from "react-icons/ri";

interface Props {
  setSelectCategoria: (e: string) => void;
  selectCategoria: string;
  findConvenios: () => void;
}

const CATEGORIAS = [
  "Todos",
  "Celebraciones",
  "Comida",
  "Educación",
  "Entretenimiento",
  "Hoteles para mascotas",
  "Ropa y artículos",
  "Salud",
  "Seguros",
  "Tecnología",
  "Transporte",
  "Viajes",
];

const FiltroConvenio = ({
  setSelectCategoria,
  selectCategoria,
  findConvenios,
}: Props) => {
  return (
    <form
      className="w-sm flex items-end gap-2 relative "
      onSubmit={(e) => {
        e.preventDefault();
        findConvenios();
      }}
    >
      <Select
        isRequired
        classNames={selectClassNames}
        labelPlacement="outside"
        variant="bordered"
        label="Categoria"
        placeholder="Seleccionar..."
        radius="sm"
        size="sm"
        defaultSelectedKeys={[selectCategoria]}
        onChange={(e) => setSelectCategoria(e.target.value)}
      >
        {CATEGORIAS.map((categoria) => (
          <SelectItem key={categoria} textValue={categoria}>
            <p className="text-[12px]">{categoria}</p>
          </SelectItem>
        ))}
      </Select>
      <Button
        type="submit"
        className=" bg-orange-500 min-w-[56px]  rounded-r-xl -bottom-0.5 z-[2] flex items-center justify-center cursor-pointer hover:bg-orange-400 transition-colors"
      >
        <RiSearchEyeFill className="text-2xl text-white" />
      </Button>
    </form>
  );
};

export default FiltroConvenio;
