import React from 'react';

function CurrencyCompressor(value) {
    let newValue;
    let amount = Number(value);
    let K = 10000;
    let M = 1000000;
    let B = 1000000000;
    if (!amount) return;
    if (amount < K) {
        return (amount).toFixed(1).replace(/\.0+$/,'');
    } else if (amount >= K && amount < M) {
        newValue = `${(amount / 1000).toFixed(1).replace(/\.0+$/,'')} k`
    } else if (amount >= M && amount < B) {
        newValue = `${(amount / M).toFixed(1).replace(/\.0+$/,'')} mn`
    } else {
        newValue = `${(amount / B).toFixed(1).replace(/\.0+$/,'')} bn`
    }
    return newValue;
}
export default CurrencyCompressor;