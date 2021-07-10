import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";

import * as S from "./styles";

const StoresTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Última atualização",
        accessor: "col2",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <S.Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <S.Th {...column.getHeaderProps()}>
                {column.render("Header")}
              </S.Th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {console.log(cell)}
                    <a href="#">test</a>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </S.Table>
  );
};

export default StoresTable;
