import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Skeleton,
} from "@heroui/react";

interface SkeletonTableProps {
  columns: string[]; // Titulos de las columnas
  rows?: number; // Cantidad de filas que mostrará el Skeleton
}

const SkeletonTable = ({ columns, rows = 5 }: SkeletonTableProps) => {
  const fakeRows = Array.from({ length: rows });

  return (
    <Table
      aria-label="Skeleton de tabla"
      classNames={{
        wrapper: "p-0 overflow-auto",
      }}
      isStriped
      radius="sm"
    >
      <TableHeader>
        {columns.map((col, i) => (
          <TableColumn key={i} className="text-[10px] font-semibold">
            {col}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {fakeRows.map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full rounded-md" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
