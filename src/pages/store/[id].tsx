import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLoading, BallTriangle } from "@agney/react-loading";

import api from "../../services/api";
import * as S from "../../styles/store";
import ProductsTable from "../../components/ProductsTable";
import RemoveStoreModal from "../../components/RemoveStoreModal";

export interface StoreData {
  _id: string;
  url: string;
  createdAt: string;
  name: string;
}

export const StorePage = () => {
  const [storeData, setStoreData] = useState({} as StoreData);
  const [storeProductsData, setStoreProductsData] = useState(null);
  const [showRemoveStoreModal, setShowRemoveStoreModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="35" />,
  });

  useEffect(() => {
    async function fetchStoreData() {
      try {
        const response = await api.get(`store/find/${id}`);

        setStoreData(response.data.store);
        setStoreProductsData(response.data.products);
      } catch (err) {
        console.log(err);
      }
    }

    if (!id) {
      return;
    }

    fetchStoreData();
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
          <ProductsTable products={storeProductsData} />
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
            left: "45%",
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

export default StorePage;
