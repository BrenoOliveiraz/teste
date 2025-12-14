import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const usePetsData = (petId: number | null) => {
    const fetchData = async () => {
        console.log("fetchData executando com petId:", petId)

        const response = await axios.get(
            `https://petstore.swagger.io/v2/pet/${petId}`
        )

        console.log("RETORNO DA API (data):", response.data)

        return response.data
    }



    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['pets-data', petId],
        enabled: !!petId
    })

    return query


}