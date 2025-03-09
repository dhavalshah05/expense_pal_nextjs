import Big from 'big.js';

Big.DP = 2;
Big.RM = Big.roundHalfEven;

export const toPaisa = (amount: number) =>
    new Big(amount).mul(100).round(2).toNumber();

export const fromPaisa = (amount: number) =>
    new Big(amount).div(100).round(2).toNumber();
