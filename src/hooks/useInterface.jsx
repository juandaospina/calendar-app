import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useInterface = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector(state => state.ui);

  const onOpenModal = () => {
    dispatch(onOpenDateModal());
  }

  const onCloseModal = () => {
    dispatch(onCloseDateModal());
  }

  return {
    // Properties
    isDateModalOpen,

    // Methods
    onOpenModal,
    onCloseModal,
  };
};
