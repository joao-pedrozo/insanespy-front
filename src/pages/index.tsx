import { useEffect, useState } from "react";

import * as S from "../styles/home";

import StoresTable from "../components/StoresTable";

export default function Home() {
  return (
    <S.HomePageWrapper>
      <S.StoresTitlte>Suas lojas</S.StoresTitlte>
      <StoresTable />
    </S.HomePageWrapper>
  );
}
