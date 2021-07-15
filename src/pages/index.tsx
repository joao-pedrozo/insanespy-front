import { useEffect, useState } from "react";

import * as S from "../styles/home";

import StoresTable from "../components/StoresTable";
import Button from "../components/Button";
import AddStoreModal from "../components/AddStoreModal";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);

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

  const handleButtonClick = () => {
    setShowAddStoreModal((prev) => !prev);
  };

  return (
    <>
      <S.HomePageWrapper>
        <S.StoresTitle>Suas lojas</S.StoresTitle>
        <S.StoresTableWrapper>
          <S.StoreInfo>
            <b>Observando {stores.length} lojas</b>
            <Button kind="primary" onClick={handleButtonClick}>
              Adicionar nova loja
            </Button>
          </S.StoreInfo>
          <StoresTable stores={stores} />
        </S.StoresTableWrapper>
      </S.HomePageWrapper>
      <AddStoreModal
        showModal={showAddStoreModal}
        setShowModal={setShowAddStoreModal}
      />
    </>
  );
}
