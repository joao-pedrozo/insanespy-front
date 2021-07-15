import { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
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
        Cell: (props) => {
          return <img src={props.value} alt="" width={50} />;
        },
      },
      {
        Header: "Nome do produto",
        accessor: "name",
      },
      {
        Header: "Última venda",
        accessor: "lastSale",
        Cell: (props) => {
          return <span>{howLongHasBeenSinceDate(props.value)}</span>;
        },
      },
      {
        Header: "Vendas observadas",
        accessor: "amountOfSales",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      products.map((product) => {
        console.log(product);

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
      // initialState: {
      //   sortBy: [
      //     {
      //       id: "amountOfSales",
      //       desc: true,
      //     },
      //   ],
      // },
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  if (products.length) {
    return (
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
          {rows.map((row) => {
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
  } else {
    return <span>Carregando...</span>;
  }
};

export default StoresTable;
