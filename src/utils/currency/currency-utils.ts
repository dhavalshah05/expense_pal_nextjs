import Big from 'big.js';

Big.DP = 2;
Big.RM = Big.roundHalfEven;

const toPaisa = (amount: number) =>
    new Big(amount).mul(100).round(2).toNumber();

const fromPaisa = (amount: number) =>
    new Big(amount).div(100).round(2).toNumber();

const currencyUtils = {
    toPaisa,
    fromPaisa
}

export default currencyUtils;

