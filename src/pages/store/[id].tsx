import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import api from "../../services/api";
import * as S from "../../styles/store";
import ProductsTable from "../../components/ProductsTable";

interface StoreData {
  _id: string;
  url: string;
  createdAt: string;
  name: string;
}

export const StorePage = () => {
  const [storeData, setStoreData] = useState({} as StoreData);
  const [storeProductsData, setStoreProductsData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

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

  return (
    <S.StorePageWrapper>
      <Link href="/">
        <S.GetBackToHome>👈 voltar para listagem de lojas</S.GetBackToHome>
      </Link>
      <S.StoreTitle>Produtos de {storeData.name}</S.StoreTitle>
      <ProductsTable products={storeProductsData} />
    </S.StorePageWrapper>
  );
};

export default StorePage;
