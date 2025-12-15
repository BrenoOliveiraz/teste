import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  Box,
  Flex,
  Tooltip,
  useDisclosure,

} from '@chakra-ui/react';
import { LockIcon, UnlockIcon, WarningIcon } from '@chakra-ui/icons';
import ModalRelatorioQuarentena from '../../components/ModalQuarentena';
import TabelaHeader from '../../components/TabelaHeader';
import { useEffect, useState } from 'react';
import { getProducts } from '../../mockdata/data';
import { useQuery } from '@tanstack/react-query';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import SuccessBlockAlert from '../../components/AvisoBloqueio'



const StatusIcon = ({ status, onClick }: any) => {
  const isBlocked = status === 'bloqueado';
  const color = isBlocked ? 'red.500' : 'green.500';
  const IconComponent = isBlocked ? LockIcon : UnlockIcon;
  const label = isBlocked ? 'Bloqueado. Clique para Desbloquear' : 'Desbloqueado. Clique para Bloquear';
  return (
    <Tooltip label={label} placement="top">
      <IconComponent
        w={5}
        h={5}
        color={color}
        cursor="pointer" // Adiciona cursor pointer para indicar que é clicável
        onClick={onClick} // 'onClick' é indefinido
      />
    </Tooltip>
  );
};

const InfoIcon = ({ onOpen }: any) => (

  <Tooltip label="Informações Adicionais" placement="top">
    <WarningIcon
      w={5}
      h={5}
      color="orange.400"
      cursor="pointer"
      onClick={onOpen}
    />
  </Tooltip>
);

const TabelaQuarentena = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
  const [filteredValues, setFilteredValues] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();

  useEffect(() => {
    setFilteredValues(data);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }


  const handleSearch = (filteredValues) => {
    setFilteredValues(filteredValues);
  };

  const handleStatusChange = (item) => {
    // **AQUI: Sua lógica de bloqueio/desbloqueio real deve ir aqui.**
    // Exemplo: fazer uma chamada API para alterar o status do item.
    console.log(`Tentando alterar status do item: ${item.codigo}. Status atual: ${item.status}`);

    // Após a lógica de sucesso (ex: API retornou 200), abra o alerta de sucesso.
    // O alerta da imagem diz 'Bloqueio gerado com sucesso!!', então o usaremos para indicar sucesso na operação.
    onAlertOpen();
  };


  return (
    <>
      <TabelaHeader data={data} onSearch={handleSearch} />
      <TableContainer
        bg="white"
        border='1px solid #117BAA'
        borderRadius="lg"
        p={4}
        boxShadow="md"
        maxW="100%"
        overflow="hidden"

      >
        <Table
          overflow="hidden"
          borderRadius="10px"
          variant="striped"
          size="sm"
          textAlign="center"
        >
          <Thead textAlign="center" bg="#0F4F6D" fontWeight='900'>
            <Tr textAlign="center" color='white' fontSize='14px' >
              {["OP", "Data Geração", "Código", "Descrição", "Dias Quarentena", "Volume", "Estoque", "Status", "Inf"].map((header, index) => (
                <Th textAlign="center" color='white' key={index} textTransform="none">
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredValues && filteredValues.map((item, index) => (
              <Tr key={index} _hover={{ bg: 'gray.50' }}>
                <Td textAlign="center" fontSize="12px" color="gray.600">{item.op}</Td>
                <Td textAlign="center" fontSize="12px">{item.dataGeracao}</Td>
                <Td textAlign="center" fontSize="12px">{item.codigo}</Td>
                <Td textAlign="center" fontSize="12px" maxW="250px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  <Tooltip label={item.descricao} placement="top-start">
                    {item.descricao}
                  </Tooltip>
                </Td>
                <Td textAlign="center" fontSize="12px" color="gray.600" fontWeight="bold">
                  {item.diasQuarentena}
                </Td>
                <Td textAlign="center" fontSize="12px">{item.volume}</Td>
                <Td textAlign="center" fontSize="sm" fontWeight="medium">
                  {item.estoque}
                </Td>
                <Td textAlign="center">
                  <StatusIcon
                    status={item.status}
                    onClick={() => handleStatusChange(item)}
                  />
                </Td>
                <Td textAlign="center">
                  <InfoIcon onOpen={onOpen} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalRelatorioQuarentena isOpen={isOpen} onClose={onClose} />

      <Modal isOpen={isAlertOpen} onClose={onAlertClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          maxW="sm" // Define a largura máxima para o alerta
        >
          {/* O componente de Alerta customizado é inserido aqui */}
          <SuccessBlockAlert onClose={onAlertClose} />
        </ModalContent>
      </Modal>
    </>

  );
};

export default TabelaQuarentena;