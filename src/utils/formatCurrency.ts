export const formatCurrency = (amount: number, format: string, currencyCode: string) => {
    return new Intl.NumberFormat(format, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
    }).format(amount)
}
