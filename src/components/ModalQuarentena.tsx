import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import RelatorioQuarentena from '../pages/Relatorio';


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalRelatorioQuarentena({ isOpen, onClose }: Props) {
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Relatório de Quarentena</ModalHeader>
        <ModalCloseButton />
              <ModalBody overflowY="hidden" maxHeight="80vh">
          <RelatorioQuarentena />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
