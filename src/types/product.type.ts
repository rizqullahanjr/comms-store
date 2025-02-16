export type Stock = {
    type: string
    qty: number
}

export type Product = {
    id: string
    stock: Stock[]
    category: string
    availability: string
    status: boolean
    image: string
    updated_at: Date
    created_at: Date
    price: number
    name: string
    description?: string
}
