import { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import numeral from "numeral";
import Image from "next/image";

import { howLongHasBeenSinceDate } from "../../utils/date";

import * as S from "./styles";

interface Product {
  _id: string;
  createdAt: string;
  createdAtShopify: string;
  firstRegisteredUpdateAtShopify: string;
  image: string;
  registeredUpdates: [Date];
  shopifyId: number;
  storeId: string;
  title: string;
  updatedAt: string;
}

interface ProductTableProps {
  products: [Product];
}

const StoresTable = ({ products }: ProductTableProps) => {
  const columns = useMemo(
    () => [
      {
        Header: "Imagem",
        accessor: "image",
        maxWidth: 150,
        minWidth: 150,
        // eslint-disable-next-line react/display-name
        Cell: (props) => {
          return <Image src={props.value} alt="" width={50} height={50} />;
        },
      },
      {
        Header: "Nome do produto",
        accessor: "name",
        // eslint-disable-next-line react/display-name
        Cell: (props) => {
          return <span title={props.value}>{props.value}</span>;
        },
      },
      {
        Header: "Última venda",
        accessor: "lastSale",
        // eslint-disable-next-line react/display-name
        Cell: (props) => {
          return <span>{howLongHasBeenSinceDate(props.value)}</span>;
        },
      },
      {
        Header: "Vendas observadas",
        accessor: "amountOfSales",
        Cell: (props) => (
          <span>{numeral(props.value).format("0,0").replace(",", ".")}</span>
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      products.map((product) => {
        return {
          image: product.image,
          name: product.title,
          lastSale: !!product.registeredUpdates.length
            ? product.registeredUpdates[product.registeredUpdates.length - 1]
            : product.firstRegisteredUpdateAtShopify,
          amountOfSales: product.registeredUpdates.length,
        };
      }),
    [products]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "amountOfSales",
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    page,
    state: { pageIndex, pageSize },
  } = tableInstance;

  if (products) {
    if (products.length) {
      return (
        <>
          <S.Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <S.ThHeader
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                      </S.ThHeader>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <S.Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <S.TdContent
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                          }}
                        >
                          <div>{cell.render("Cell")}</div>
                        </S.TdContent>
                      );
                    })}
                  </S.Tr>
                );
              })}
            </tbody>
          </S.Table>
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
        </>
      );
    } else {
      return (
        <span>
          Essa loja não possuí nenhum produto ativo nas últimas 24h :(
        </span>
      );
    }
  } else {
    return <span>Carregando...</span>;
  }
};

export default StoresTable;
