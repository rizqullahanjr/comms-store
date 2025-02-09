export type IUsers = {
  id?: string
  fullname: string
  email: string
  password?: string | null
  image: string
  addresses?:
    | Array<{
        isMain: boolean
        address: string
        phone: string
        postalCode: string
        recipient: string
      }>
    | []
  phone?: string | null
  role?: string
  type?: string
  created_at?: Date
  updated_at?: Date
}
