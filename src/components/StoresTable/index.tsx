import { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import numeral from "numeral";
import Router from "next/router";

import * as S from "./styles";
import { howLongHasBeenSinceDate } from "../../utils/date";

interface StoresTableProps {
  stores: Array<any>;
}

const StoresTable = ({ stores }: StoresTableProps) => {
  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Registrada",
        accessor: "createdAt",
        Cell: (props) => <span>{howLongHasBeenSinceDate(props.value)}</span>,
      },
      {
        Header: "Total de vendas",
        accessor: "totalSales",
        Cell: (props) => (
          <span>{numeral(props.value).format("0,0").replace(",", ".")}</span>
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      stores.map((store) => {
        return {
          _id: store._id,
          name: store.name,
          createdAt: store.createdAt,
          totalSales: numeral(store.amountOfRegisteredUpdates).format("0,0"),
        };
      }),
    [stores]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "totalSales",
            desc: true,
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const handleOnRowClick = (original) => {
    Router.push(`/store/${original._id}`);
  };

  return (
    <>
      <S.Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <S.ThHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </S.ThHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <S.Tr
                {...row.getRowProps()}
                onClick={() => handleOnRowClick(row.original)}
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
      {stores.length > 10 && (
        <S.Pagination>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Página{" "}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Ir para página:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </S.Pagination>
      )}
    </>
  );
};

export default StoresTable;
