import React from "react";

const SourceContext = React.createContext();

function SourceProviderWrapper(props) {

    const API_URL = "http://localhost:5005";

    return (
        <SourceContext.Provider
        value={{
            API_URL,
        }}
        >
        {props.children}
        </SourceContext.Provider>
    );
}

export { SourceProviderWrapper, SourceContext };
