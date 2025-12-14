import { Box, Heading, Text, Divider, InputGroup, InputLeftElement, Input, Button, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

// interface TabelaHeaderProps {
//   onSearch: (searchQuery: string) => void;
// }

const TabelaHeader = ({ onSearch, data }) => {
const [search, setSearch] = useState('')

const handleSearchChange = (e)=>{
const value= e.target.value;
setSearch(value)

const filtered = data.filter(item => item.op.toLowerCase().includes(value.toLowerCase()))
onSearch(filtered)
}

  return (
    <Box mb={4}>
      <Heading as="h3" size="lg" color="teal.500">
        Relatório de Quarentena de Produtos
      </Heading>
      <Text fontSize="md" color="gray.600" mt={1}>
        Visualize os itens que estão em quarentena, incluindo o status de bloqueio, tempo de quarentena e estoque.
      </Text>
      <Divider mt={4} />

     
      <Flex mt={4} justify="space-between" align="center">
        <InputGroup width="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Buscar por descrição ou código"
            onChange={handleSearchChange}
            size="sm"
            value={search}
          />
        </InputGroup>

        <Button colorScheme="teal" size="sm">
          Filtrar
        </Button>
      </Flex>
    </Box>
  );
};

export default TabelaHeader;
