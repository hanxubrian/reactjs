import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            fixedDecimalScale={true}
            thousandSeparator
            decimalScale={2}
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export function NumberFormatCustom1(props) {
    const { inputRef, onBlur, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
         />
    );
}

export function NumberFormatCustomPercent(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            suffix={'%'}
        />
    );
}

export function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



export function NumberFormatCustom2(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            fixedDecimalScale={true}
            decimalScale={2}
            prefix="$"
        />
    );
}

export function NumberFormatCustomFocus(props) {
    const { inputRef, onFocus, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onFocus({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            decimalScale={2}
            prefix="$"
        />
    );
}

export function NumberFormatCustom3(props) {
    const { inputRef, onBlur, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
        />
    );
}
