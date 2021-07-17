import { useEffect, useState } from "react";
import { useLoading, BallTriangle } from "@agney/react-loading";

import * as S from "../styles/home";

import StoresTable from "../components/StoresTable";
import Button from "../components/Button";
import AddStoreModal from "../components/AddStoreModal";

export default function Home() {
  const [stores, setStores] = useState(null);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [hasDataUpdated, setHasDataUpdated] = useState(false);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="35" />,
  });

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
      setHasDataUpdated(false);
    }

    fetchStores();
  }, [hasDataUpdated]);

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
