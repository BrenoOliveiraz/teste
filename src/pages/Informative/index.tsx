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
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon, WarningIcon } from '@chakra-ui/icons';

// 1. Dados de Exemplo (Simulando a sua tabela)
const data = [

  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400562',
    descricao: 'CREME DE LEITE BETA ZERO LACTOSE 200G',
    diasQuarentena: '3/10',
    volume: '5001478',
    estoque: '5265.0000',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400088',
    descricao: 'BEB LAC UHT CHOCOLATE BETANIA KIDS 200ML',
    diasQuarentena: '3',
    volume: '5001478',
    estoque: '3915.0000',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400034',
    descricao: 'QUEIJO MUSSARELA BETA 4KG',
    diasQuarentena: '6',
    volume: '5001478',
    estoque: '3396.1700',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400038',
    descricao: 'CREME DE LEITE BETA 200G',
    diasQuarentena: '3',
    volume: '5001478',
    estoque: '47385.0000',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '401614',
    descricao: 'BEB LAC UHT CHOCOLATE BETANIA KIDS 200ML',
    diasQuarentena: '10',
    volume: '5001478',
    estoque: '1145.2100',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400090',
    descricao: 'COALHADA LIGHT BETA 140G',
    diasQuarentena: '7',
    volume: '5001478',
    estoque: '21312.0000',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400082',
    descricao: 'IOG NATURAL INT BETA COPO 170G',
    diasQuarentena: '10',
    volume: '5001478',
    estoque: '27000.0000',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400157',
    descricao: 'REQUEIJAO CREMOSO BETA 200G',
    diasQuarentena: '2',
    volume: '5001478',
    estoque: '22097.0000',
    status: 'desbloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400157',
    descricao: 'REQUEIJAO CREMOSO BETA 200G',
    diasQuarentena: '2',
    volume: '5001478',
    estoque: '9816.0000',
    status: 'bloqueado',
  },
  {
    op: '1436835',
    dataGeracao: '14/11/2025',
    codigo: '400077',
    descricao: 'MISTURA REQUEIJAO GORD VEG E AMIDO 1,8KG',
    diasQuarentena: '2',
    volume: '5001478',
    estoque: '1004.0000',
    status: 'desbloqueado',
  },
];

// 2. Componentes de Renderização de Status e Info

// Componente que renderiza o ícone de Status (cadeado)
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

// Componente que renderiza o ícone de Informação (laranja)
const InfoIcon = () => (
  <Tooltip label="Informações Adicionais" placement="top">
    <WarningIcon w={5} h={5} color="orange.400" cursor="pointer" />
  </Tooltip>
);


// 3. Componente Principal da Tabela
const TabelaQuarentena = () => {
  return (
    <TableContainer
      bg="white"
      border='1px solid #117BAA'
      borderRadius="lg" // Arredonda as bordas do container da tabela
      p={4}
      boxShadow="md"
      maxW="100%"
      overflow="auto"
      textAlign="center"

    >
      <Table
        overflow="hidden"
        borderRadius="10px" // Arredonda as bordas da tabela
        variant="striped"
        size="sm"
       textAlign="center"
      >
        <Thead  textAlign="center" bg="#0F4F6D" fontWeight='900'>
          <Tr textAlign="center" color='white' fontSize='14px' >
            {["OP", "Data Geração", "Código", "Descrição", "Dias Quarentena", "Volume", "Estoque", "Status", "Inf"].map((header, index) => (
              <Th textAlign="center" color='white' key={index} textTransform="none">
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr  key={index} _hover={{ bg: 'gray.50' }}>
              <Td  textAlign="center" fontSize="12px" color="gray.600">{item.op}</Td>
              <Td textAlign="center" fontSize="12px">{item.dataGeracao}</Td>
              <Td textAlign="center" fontSize="12px">{item.codigo}</Td>
              <Td textAlign="center" fontSize="12px" maxW="250px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                <Tooltip label={item.descricao} placement="top-start">
                  {item.descricao}
                </Tooltip>
              </Td>
              <Td textAlign="center" fontSize="12px" color="blue.500" fontWeight="bold">
                {item.diasQuarentena}
              </Td>
              <Td textAlign="center" fontSize="12px">{item.volume}</Td>
              <Td textAlign="center"  fontSize="sm" fontWeight="medium">
                {item.estoque}
              </Td>
              <Td  textAlign="center">
                <StatusIcon status={item.status} />
              </Td>
              <Td textAlign="center">
                <InfoIcon />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

  );
};

export default TabelaQuarentena;