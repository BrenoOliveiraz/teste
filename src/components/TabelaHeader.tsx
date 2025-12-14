import { Box, Heading, Text, Divider, InputGroup, InputLeftElement, Input, Button, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input as ChakraInput, ModalFooter } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../mockdata/data';

const TabelaHeader = ({ onSearch, data }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createProductAsync } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {  
      const cachedData = queryClient.getQueryData(['products']) || [];  

      queryClient.setQueryData(['products'], [...cachedData, data]);  
    },
    onError: (error) => {
      console.log('Erro na criação do produto', error);
    }
  });

  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controla o estado do modal
  const [newProduct, setNewProduct] = useState({
    descricao: '',
    codigo: '',
    estoque: '',
    diasQuarentena: ''
  });

  const handleCreateProduct = async () => {
    try {
      await createProductAsync(newProduct);  // Passando os dados do novo produto
      setNewProduct({
        descricao: '',
        codigo: '',
        estoque: '',
        diasQuarentena: ''
      });
      onClose(); // Fecha o modal após criação
    } catch (error) {
      console.log('Erro ao criar produto:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewProduct(prev => ({
      ...prev, [id]: value
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = data.filter(item =>
      Object.values(item)
        .map((fieldValue) => fieldValue.toString().toLowerCase())
        .some((fieldValue) => fieldValue.includes(value.toLowerCase()))
    );

    onSearch(filtered);
  };

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

        <Button colorScheme="teal" size="sm" onClick={onOpen}>
          Criar Produto
        </Button>
      </Flex>

      {/* Modal para criação de produto */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Novo Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="descricao" mb={4}>
              <FormLabel>Descrição</FormLabel>
              <ChakraInput
                type="text"
                value={newProduct.descricao}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="codigo" mb={4}>
              <FormLabel>Código</FormLabel>
              <ChakraInput
                type="text"
                value={newProduct.codigo}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="estoque" mb={4}>
              <FormLabel>Estoque</FormLabel>
              <ChakraInput
                type="number"
                value={newProduct.estoque}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="diasQuarentena" mb={4}>
              <FormLabel>Dias de Quarentena</FormLabel>
              <ChakraInput
                type="number"
                value={newProduct.diasQuarentena}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleCreateProduct} colorScheme="teal" mr={3}>
              Criar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TabelaHeader;
