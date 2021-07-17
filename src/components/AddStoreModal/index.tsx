import { useState } from "react";
import { toast } from "react-toastify";
import Router from "next/router";

import BaseModal from "../BaseModal";
import Button from "../Button";
import Input from "../Input";

import api from "../../services/api";
import * as S from "./styles";

interface AddStoreModalProps {
  showModal: boolean;
  setShowModal: (active: boolean) => void;
}

const AddStoreModal = ({ showModal, setShowModal }: AddStoreModalProps) => {
  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");

  const handleOnButtonClick = async () => {
    if (!storeName) {
      toast.error("❌ Preencha o campo 'Nome da loja'", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!storeUrl) {
      toast.error("❌ Preencha o campo 'URL da loja'", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const response = await api.post("/store/add", {
        name: storeName,
        url: storeUrl,
      });
      Router.push("/");
      toast("🚀 Sucesso em adicionar nova loja!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <S.AddStoreModalWrapper>
        <S.StoresTitle>Adicionar nova loja</S.StoresTitle>
        <Input
          id="store-name"
          label="Nome da loja"
          value={storeName}
          onChange={(ev) => setStoreName(ev.target.value)}
        />
        <Input
          id="store-url"
          label="URL da loja"
          value={storeUrl}
          onChange={(ev) => setStoreUrl(ev.target.value)}
        />
        <Button kind="primary" onClick={handleOnButtonClick}>
          Adicionar nova loja
        </Button>
      </S.AddStoreModalWrapper>
    </BaseModal>
  );
};

export default AddStoreModal;
