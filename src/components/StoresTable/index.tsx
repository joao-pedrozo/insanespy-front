import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import numeral from "numeral";

import * as S from "./styles";

const StoresTable = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/store/find`,
        {
          method: "GET",
        }
      );
      const stores = await response.json();
      setStores(stores);
    }

    fetchStores();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Criada em",
        accessor: "createdAt",
      },
      {
        Header: "Total de vendas",
        accessor: "totalSales",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        col1: "name",
        col2: "createdAt",
        col3: "totalSales",
      },
    ],
    []
  );

  const data2 = useMemo(
    () =>
      stores.map((store) => {
        return {
          _id: store._id,
          name: store.name,
          createdAt: store.formatedCreatedAt,
          totalSales: numeral(store.amountOfRegisteredUpdates).format("0,0"),
        };
      }),
    [stores]
  );

  const tableInstance = useTable({ columns, data: data2 });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleOnRowClick = (original) => {};

  return (
    <S.Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <S.ThHeader {...column.getHeaderProps()}>
                {column.render("Header")}
              </S.ThHeader>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <S.Tr
              {...row.getRowProps()}
              onClick={() => {
                console.log(row);
              }}
            >
              {row.cells.map((cell) => {
                return (
                  <S.TdContent
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                    }}
                  >
                    {cell.render("Cell")}
                  </S.TdContent>
                );
              })}
            </S.Tr>
          );
        })}
      </tbody>
    </S.Table>
  );
};

export default StoresTable;
