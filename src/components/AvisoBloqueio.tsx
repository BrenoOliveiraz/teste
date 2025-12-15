import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const SuccessBlockAlert = ({ onClose }) => {
  return (
    <Box
      maxW="lg"
      mx="auto"
      bg="white"
      border="2px solid"
      borderColor="blue.300"
      borderRadius="2xl"
      boxShadow="xl"
      position="relative"
      p={10}
      pt={14}
    >
      {/* Header AVISO */}
      <Flex
        position="absolute"
        top={-5}
        left={6}
        align="center"
        bg="blue.500"
        color="white"
        px={4}
        py={1.5}
        borderRadius="full"
        gap={2}
      >
        <Box
          bg="red.500"
          borderRadius="full"
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={WarningIcon} boxSize={3.5} />
        </Box>

        <Text fontSize="sm" fontWeight="bold">
          AVISO
        </Text>
      </Flex>

      {/* Conteúdo */}
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        gap={8}
      >
        {/* Texto */}
        <Text fontSize="xl" fontWeight="bold">
          <Text as="span" color="red.500">
            Bloqueio
          </Text>{" "}
          <Text as="span" color="blue.600">
            gerado com sucesso!!
          </Text>
        </Text>

        {/* Botão */}
        <Button
          colorScheme="green"
          size="lg"
          px={14}
          fontWeight="bold"
          borderRadius="md"
          onClick={onClose}
        >
          OK
        </Button>
      </Flex>
    </Box>
  );
};

export default SuccessBlockAlert;
