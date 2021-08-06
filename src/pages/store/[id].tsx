import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLoading, BallTriangle } from "@agney/react-loading";
import { GetStaticPaths } from "next";
import { GetStaticProps, GetStaticPropsContext } from "next";

import api from "../../services/api";
import * as S from "../../styles/store";
import ProductsTable from "../../components/ProductsTable";
import RemoveStoreModal from "../../components/RemoveStoreModal";
import dbConnect from "../../lib/dbConnect";
import Store from "../../models/store";
import Product from "../../models/product";

export interface StoreData {
  _id: string;
  url: string;
  createdAt: string;
  name: string;
}

export const StorePage = ({ storeDataStatic, storeProductsDataStatic }) => {
  const [storeData, setStoreData] = useState({} as StoreData);
  const [storeProductsData, setStoreProductsData] = useState(null);
  const [showRemoveStoreModal, setShowRemoveStoreModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="35" />,
  });

  async function fetchStoreData() {
    try {
      const response = await api.get(`store/find/${id}`);

      setStoreData(response.data.store);
      setStoreProductsData(response.data.products);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    if (!storeDataStatic && !storeProductsDataStatic) {
      fetchStoreData();
    }
    {
      setStoreData(storeDataStatic);
      setStoreProductsData(storeProductsDataStatic);
    }
  }, [id]);

  const handleOnRemoveStore = () => {
    setShowRemoveStoreModal(true);
  };

  return (
    <S.StorePageWrapper>
      <Link href="/">
        <S.GetBackToHome>👈 voltar para listagem de lojas</S.GetBackToHome>
      </Link>
      {storeProductsData ? (
        <>
          {" "}
          <S.StoreTitle>Produtos de {storeData.name}</S.StoreTitle>
          <S.DeleteStoreLink onClick={handleOnRemoveStore}>
            remover loja
          </S.DeleteStoreLink>
          <ProductsTable
            storeUrl={storeData.url}
            products={storeProductsData}
          />
          <RemoveStoreModal
            setShowModal={setShowRemoveStoreModal}
            showModal={showRemoveStoreModal}
            store={storeData}
          />
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
            left: "50%",
          }}
        >
          {indicatorEl}
          <br />
          <span>Carregando</span> {/* renders only while loading */}
        </section>
      )}
    </S.StorePageWrapper>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params.id;
  await dbConnect();

  const store = await Store.findById({ _id: id });
  const storeProducts = await Product.find({ storeId: id });

  return {
    props: {
      storeDataStatic: JSON.parse(JSON.stringify(store)),
      storeProductsDataStatic: JSON.parse(JSON.stringify(storeProducts)),
    },
    revalidate: 60,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const stores = await Store.find();
  const allStoresId = stores.map((store) => {
    return {
      params: { id: String(store._id) },
    };
  });

  return {
    paths: [...allStoresId],
    fallback: true,
  };
};

// export async function getStaticProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }

export default StorePage;
