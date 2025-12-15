export async function getProducts() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [

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

}


export interface CreateProductRequest {
    op: string;
    dataGeracao: string
    codigo: string
    descricao: string
    diasQuarentena: string
    volume: string
    estoque: string
    status: string
}


export async function createProduct(product: CreateProductRequest) {
    // Simula um tempo de espera, como se fosse uma requisição para um backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retorna o produto criado, para simular a criação no backend
    return product;
}