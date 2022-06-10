import React from "react";

const SourceContext = React.createContext();

function SourceProviderWrapper(props) {

    const API_URL = "http://localhost:5005";
    const externalContent_API_url = "https://imdb-api.com/en/API/"
    const externalContent_API_key = "/k_kkkxuxue"

    return (
        <SourceContext.Provider
        value={{
            API_URL,
            externalContent_API_url,
            externalContent_API_key,
        }}
        >
        {props.children}
        </SourceContext.Provider>
    );
}

export { SourceProviderWrapper, SourceContext };
