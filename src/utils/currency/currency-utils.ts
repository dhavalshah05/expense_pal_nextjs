import Big from 'big.js';

Big.DP = 2;
Big.RM = Big.roundHalfEven;

const toPaisa = (amount: number) =>
    new Big(amount).mul(100).round(2).toNumber();

const fromPaisa = (amount: number) =>
    new Big(amount).div(100).round(2).toNumber();

const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    })
    return formatter.format(amount);
}

const currencyUtils = {
    toPaisa,
    fromPaisa,
    formatCurrency
}

export default currencyUtils;

