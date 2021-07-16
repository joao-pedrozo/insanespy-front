import BaseModal from "../BaseModal";
import Button from "../Button";
import { StoreData } from "../../pages/store/[id]";
import * as S from "./styles";

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
  return (
    <BaseModal setShowModal={setShowModal} showModal={showModal}>
      <S.AddStoreModalWrapper>
        <h1>
          Tem certeza que deseja remover{" "}
          <b className="highlighted">{store.name}</b>?
        </h1>
        <span>
          Essa ação irá remover permanentemente os dados da loja junto de seu
          registro de vendas.
          <br />
          <span className="tip">
            {" "}
            Você pode cadastrar essa loja novamente quando desejar.
          </span>
        </span>

        <div>
          <Button kind="cancel">Cancelar</Button>
          <Button>Remover</Button>
        </div>
      </S.AddStoreModalWrapper>
    </BaseModal>
  );
};

export default RemoveStoreModal;
