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

const dataRel = [
    {
        codigo: '400562',
        descricaoProd: 'CREME DE LEITE BETA ZERO LACTOSE 200G',
        qtd: '5265',
        fabricacao: '01/01/2025',
        validade: '30/06/2028',
        lote: 'L019281287',
        endereco: 'R10-P1-A0-A1',
    },
    {
        codigo: '400562',
        descricaoProd: 'CREME DE LEITE BETA ZERO LACTOSE 200G',
        qtd: '5265',
        fabricacao: '01/01/2025',
        validade: '30/06/2028',
        lote: 'L019281287',
        endereco: 'R10-P1-A0-A1',
    },
    {
        codigo: '400562',
        descricaoProd: 'CREME DE LEITE BETA ZERO LACTOSE 200G',
        qtd: '5265',
        fabricacao: '01/01/2025',
        validade: '30/06/2028',
        lote: 'L019281287',
        endereco: 'R10-P1-A0-A1',
    },
    {
        codigo: '400562',
        descricaoProd: 'CREME DE LEITE BETA ZERO LACTOSE 200G',
        qtd: '5265',
        fabricacao: '01/01/2025',
        validade: '30/06/2028',
        lote: 'L019281287',
        endereco: 'R10-P1-A0-A1',
    },
    {
        codigo: '400562',
        descricaoProd: 'CREME DE LEITE BETA ZERO LACTOSE 200G',
        qtd: '5265',
        fabricacao: '01/01/2025',
        validade: '30/06/2028',
        lote: 'L019281287',
        endereco: 'R10-P1-A0-A1',
    },
]

const firstHead = [
    {
        statusItem: 'bloqueado',
        op: '1436835',
        data: '01/08/2025',
        paletes: '5',
        skus: '1',
        itens: '2593',
        dataPrev: '01/01/2026',
    }
]



const IconStatus = ({ status }: any) => {
    const isBlocked = status === 'bloqueado';
    const color = isBlocked ? 'red.500' : 'green.500';
    const IconStatusComponent = isBlocked ? LockIcon : UnlockIcon;

    return (
        <Tooltip label={isBlocked ? 'Bloqueado' : 'Desbloqueado'} placement="top">
            <IconStatusComponent w={5} h={5} color={color} />
        </Tooltip>
    );
};

export default function RelatorioQuarentena() {

    return (
        <Box >
          
            <TableContainer
                bg='white'
                justifyItems={'center'}
                px={'4'}
                py={'1'}
                 overflow="hidden"
            >
                <Table variant={'striped'} borderRadius={'10px'} overflow='hidden'>
                    <Thead bg="black" fontWeight='900'>
                        <Tr color='white'>
                            {
                                ["Status", "OP", "Data", "Paletes", "SKUs", "Itens", "Data Prevista"]
                                    .map((row1, index) => (
                                        <Th
                                            fontSize={'12px'}
                                            textTransform={'none'}
                                            color={'white'}
                                            key={index}
                                            textAlign={'center'}
                                        >
                                            {row1}
                                        </Th>
                                    ))
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {firstHead.map((first) => (
                            <Tr key={first.op}>
                                <Td textAlign={'center'}><IconStatus status={first.statusItem} /></Td>
                                <Td textAlign={'center'}>{first.op}</Td>
                                <Td textAlign={'center'}>{first.data}</Td>
                                <Td textAlign={'center'}>{first.paletes}</Td>
                                <Td textAlign={'center'}>{first.skus}</Td>
                                <Td textAlign={'center'}>{first.itens}</Td>
                                <Td textAlign={'center'}>{first.dataPrev}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Segunda Tabela */}
            <TableContainer
                bg='white'
                borderRadius='lg'
                justifyItems={'center'}
                px={'4'}
                 overflow="hidden"

            >
                <Table variant={'striped'} borderRadius={'10px'} overflow='hidden'>
                    <Thead textAlign="center" bg="#0F4F6D" fontWeight='900'>
                        <Tr color='white'>
                            {
                                ["Código", "Descrição produto", "Qtd", "Fabricação", "Validade", "Lote", "Endereço"]
                                    .map((row1, index) => (
                                        <Th
                                            fontSize={'12px'}
                                            textTransform={'none'}
                                            color={'white'}
                                            key={index}
                                            textAlign={'center'} // Centralizando os itens do cabeçalho
                                        >
                                            {row1}
                                        </Th>
                                    ))
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dataRel.map((rel) => (
                            <Tr key={rel.codigo}>
                                <Td>{rel.codigo}</Td>
                                <Td>{rel.descricaoProd}</Td>
                                <Td>{rel.qtd}</Td>
                                <Td>{rel.fabricacao}</Td>
                                <Td>{rel.validade}</Td>
                                <Td>{rel.lote}</Td>
                                <Td>{rel.endereco}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
