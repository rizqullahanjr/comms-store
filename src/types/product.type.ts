export type Stock = {
    type: string // Type of stock (e.g., "Sedang", "Besar")
    qty: number // Quantity available
}

export type Product = {
    id: string // Product ID
    stock: Stock[] // Array of stock information
    category: string // Product category (e.g., "Keychain")
    status: boolean // Product availability status
    image: string // URL of the product image
    updated_at: Date // Last updated timestamp
    created_at: Date // Creation timestamp
    price: number // Product price
    name: string // Product name
}
