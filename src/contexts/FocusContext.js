import React, { useState } from 'react';
import { Record } from 'immutable';

const FocusContext = React.createContext();

// Only useful when passing to the `useContext` hook.
export default FocusContext;

const Value = Record({ index: 1, setFocusIndex: undefined });

/**
 * The HOC for the Context Provider, so that a setter can be added to the
 * context value.
 * @param {Object} props The props passed to the provider
 * @returns {Component} The wrapper Context Provider
 */
export function Provider(props) {
    let [value, setValue] = useState(null);

    if (!value) {
        value = Value({
            setFocusIndex: index => {
                setValue(value.set('index', index));
            },
        });
    }

    return <FocusContext.Provider {...props} value={value} />;
}

export const Consumer = FocusContext.Consumer;
