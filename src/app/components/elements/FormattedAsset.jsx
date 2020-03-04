import React from 'react';
import {
    formatDecimal,
    parsePayoutAmount,
} from 'app/utils/ParsersAndFormatters';

const FormattedAsset = ({ amount, asset, postSummary = false, classname }) => {
    if (amount && typeof amount === 'string') {
        amount = parsePayoutAmount(amount);
    }

    const amnt = formatDecimal(amount);
    return asset === '$' ? (
        <span className={`FormattedAsset ${classname}`}>
            <span className="prefix">$</span>
            <span className="integer">{amnt[0]}</span>
            <span className="decimal">{amnt[1]}</span>
        </span>
    ) : !postSummary ? (
        <span className={`FormattedAsset ${classname}`}>
            <span className="integer">{amnt[0]}</span>
            <span className="decimal">{amnt[1]}</span>{' '}
            <span className="asset">{asset}</span>
        </span>
    ) : (
        <span className="FormattedAsset" />
    );
};

export default FormattedAsset;
