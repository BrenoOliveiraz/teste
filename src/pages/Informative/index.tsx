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



const StatusIcon = ({ status }: any) => {
  const isBlocked = status === 'bloqueado';
  const color = isBlocked ? 'red.500' : 'green.500';
  const IconComponent = isBlocked ? LockIcon : UnlockIcon;

  return (
    <Tooltip label={isBlocked ? 'Bloqueado' : 'Desbloqueado'} placement="top">
      <IconComponent w={5} h={5} color={color} />
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
                  <StatusIcon status={item.status} />
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
    </>

  );
};

export default TabelaQuarentena;