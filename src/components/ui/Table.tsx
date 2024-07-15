// components/Table.js
import {
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Currency from "./Currency";
import Title from "@/common/io/Title";

export interface Column {
  label: string;
  field: string;
  align?: "left" | "center" | "right";
  render?: (row: any) => React.ReactNode;
}

interface Props {
  columns: Column[];
  items: any[];
  totalAmountDue: number;
  amountCaption: string;
}

const Table: React.FC<Props> = ({
  columns,
  items,
  totalAmountDue,
  amountCaption,
}) => {
  return (
    <TableContainer
      component={Paper}
      className="max-h-[500px]  overflow-auto border"
    >
      <MuiTable sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead className="sticky top-0 bg-white shadow-sm">
          <TableRow className="uppercase">
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || "left"}
                className="font-bold"
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={`${index}-${columnIndex}`}
                  align={column.align || "left"}
                >
                  {column.render ? (
                    column.render(item)
                  ) : typeof item[column.field] === "number" ? (
                    <Currency amount={item[column.field]} />
                  ) : (
                    <p>{item[column.field]}</p>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {totalAmountDue !== undefined && (
            <TableRow>
              <TableCell
                colSpan={columns.length - 1}
                align="right"
                className="font-bold"
              >
                {amountCaption}
              </TableCell>
              <TableCell align="right" className="font-bold">
                <Currency amount={totalAmountDue} currency="Php" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
