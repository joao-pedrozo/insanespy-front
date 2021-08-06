import { useEffect, useState } from "react";
import { useLoading, BallTriangle } from "@agney/react-loading";
import { GetStaticProps, GetStaticPropsContext } from "next";

import * as S from "../styles/home";

import StoresTable from "../components/StoresTable";
import Button from "../components/Button";
import AddStoreModal from "../components/AddStoreModal";
import Product from "../models/product";
import Store from "../models/store";
import dbConnect from "../lib/dbConnect";
import { formatDate } from "../utils/date";

export default function Home({ storesProp }) {
  const [stores, setStores] = useState(null);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [hasDataUpdated, setHasDataUpdated] = useState(false);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="35" />,
  });

  async function fetchStores() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/find`,
      {
        method: "GET",
      }
    );
    const stores = await response.json();
    setStores(stores);
    setHasDataUpdated(false);
  }

  useEffect(() => {
    if (!storesProp) {
      fetchStores();
    } else {
      setStores(storesProp);
    }
  }, [storesProp, hasDataUpdated]);

  const handleButtonClick = () => {
    setShowAddStoreModal((prev) => !prev);
  };

  return (
    <>
      <S.HomePageWrapper>
        <S.StoresTitle>Suas lojas</S.StoresTitle>
        <S.StoresTableWrapper>
          {!!stores ? (
            <>
              <S.StoreInfo>
                <b>Observando {stores.length} lojas</b>
                <Button kind="primary" onClick={handleButtonClick}>
                  Adicionar nova loja
                </Button>
              </S.StoreInfo>
              {stores.length ? (
                <StoresTable stores={stores} />
              ) : (
                <span>Nenhuma loja cadastrada. Comece cadastrando uma :)</span>
              )}
            </>
          ) : (
            <section
              {...containerProps}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "absolute",
                top: "30%",
                left: "45%",
              }}
            >
              {indicatorEl}
              <br />
              <span>Carregando</span> {/* renders only while loading */}
            </section>
          )}
        </S.StoresTableWrapper>
      </S.HomePageWrapper>
      <AddStoreModal
        showModal={showAddStoreModal}
        setShowModal={setShowAddStoreModal}
        setHasDataUpdated={setHasDataUpdated}
      />
    </>
  );
}

export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext
) {
  await dbConnect();
  const stores = await Store.find();
  const allProducts = await Product.find();

  const formatedStores = await Promise.all(
    stores.map(async (store, index) => {
      const storeProducts = allProducts.filter((product) =>
        product.storeId.equals(store._id)
      );

      const lastSale = storeProducts.reduce((accumulator: number, product) => {
        if (new Date(product.lastUpdatedAt).getTime() > accumulator) {
          return product.lastUpdatedAt;
        } else {
          return accumulator;
        }
      }, 0);

      const totalSales = storeProducts.reduce((accumulator, product) => {
        return accumulator + product.totalSales;
      }, 0);

      return {
        // @ts-ignore
        ...store._doc,
        lastSale,
        totalSales,
        // @ts-ignore
        formatedCreatedAt: formatDate(store._doc.createdAt),
      };
    })
  );

  return {
    props: {
      storesProp: JSON.parse(JSON.stringify(formatedStores)),
    },
    revalidate: 60,
  };
}
