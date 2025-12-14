import { useEffect, useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    Button,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { usePetsData } from "../../hooks/usePets";

interface Pet {
    id: number | null;
    name: string;
    status: string;
}


export default function Home() {

    const [pets, setPets] = useState<Pet[]>([]); // lista de pets
    const [editingPet, setEditingPet] = useState<Pet | null>(null); // pet sendo editado
    const [newPet, setNewPet] = useState<Pet>({ id: null, name: "", status: "" }); // novo pet
    const [petId, setPetId] = useState<number | null>(null)
    const { data, isLoading, error } = usePetsData(petId)

    const handlePetId = () => {
        if (newPet.id) {
            setPetId(newPet.id)
        }
    }

    useEffect(()=>{
        if(data){
            setPets([data])
        }

    },[data])



    return (
        <Box p="4">
            {/* ====== Create Pet ====== */}
            <Box mb="6" border="1px solid #C7D3DF" borderRadius="md" p="4">
                <Flex gap="2">
                    <Input
                        placeholder="ID"
                        type="number"
                        value={newPet.id ?? ""}
                        onChange={(e) =>
                            setNewPet({
                                ...newPet,
                                id: e.target.value === "" ? null : Number(e.target.value),
                            })
                        }
                    />

                    <Input
                        placeholder="Name"
                        value={newPet.name}
                        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />

                    <Button colorScheme="blue" onClick={handlePetId} >
                        GET
                    </Button>
                </Flex>
            </Box>

            {/* ====== Pets Table ====== */}
            <TableContainer border="1px solid #C7D3DF" borderRadius="md" p="4">
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pets.map((pet) => (
                            <Tr key={pet.id}>
                                <Td>{pet.id}</Td>
                                <Td>
                                    {editingPet?.id === pet.id ? (
                                        <Input
                                            value={editingPet.name}
                                            onChange={(e) =>
                                                setEditingPet({ ...editingPet, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        pet.name
                                    )}
                                </Td>
                                <Td>
                                    {editingPet?.id === pet.id ? (
                                        <Input
                                            value={editingPet.status}
                                            onChange={(e) =>
                                                setEditingPet({ ...editingPet, status: e.target.value })
                                            }
                                        />
                                    ) : (
                                        pet.status
                                    )}
                                </Td>
                                <Td>
                                    {editingPet?.id === pet.id ? (
                                        <Button
                                            size="sm"
                                            colorScheme="green"
                                            mr="2"
                                            onClick={() => console.log("Update pet")}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            mr="2"
                                            onClick={() => setEditingPet(pet)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => console.log("Delete pet")}
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
