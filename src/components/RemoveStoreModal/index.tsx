import { toast } from "react-toastify";

import BaseModal from "../BaseModal";
import Button from "../Button";
import api from "../../services/api";
import { StoreData } from "../../pages/store/[id]";
import * as S from "./styles";
import Router from "next/router";

interface RemoveStoreModalProps {
  showModal: boolean;
  setShowModal: (active: boolean) => void;
  store: StoreData;
}

export const RemoveStoreModal = ({
  showModal,
  setShowModal,
  store,
}: RemoveStoreModalProps) => {
  const handleOnCancel = () => {
    setShowModal(false);
  };

  const handleOnRemove = async () => {
    try {
      await api.delete(`/store/delete/${store._id}`);

      toast("🚀 Sucesso em remover loja!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      Router.push("/");
    } catch (err) {
      console.log(err);

      toast.error(
        "❌ Houve um erro ao remover a loja, por favor, tente novamente.",
        {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <BaseModal setShowModal={setShowModal} showModal={showModal}>
      <S.AddStoreModalWrapper>
        <h1>
          Tem certeza que deseja remover{" "}
          <b className="highlighted">{store.name}</b>?
        </h1>
        <span>
          Essa ação irá remover <b>permanentemente</b> os dados da loja junto de
          seu registro de vendas.
          <br />
          <span className="tip">
            Você poderá cadastrar essa loja novamente caso desejar.
          </span>
        </span>

        <S.ButtonsWrapper>
          <Button kind="cancel" onClick={handleOnCancel}>
            Cancelar
          </Button>
          <Button kind="primary" onClick={handleOnRemove}>
            Remover
          </Button>
        </S.ButtonsWrapper>
      </S.AddStoreModalWrapper>
    </BaseModal>
  );
};

export default RemoveStoreModal;
