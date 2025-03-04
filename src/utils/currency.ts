/* eslint-disable @typescript-eslint/no-explicit-any */
const convertIDR = (value: number | any ) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value)
}

export default convertIDR
