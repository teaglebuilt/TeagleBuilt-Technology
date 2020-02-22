import React from "react"
import useGithub from "../hooks/useGithubData"


export const GlobalContext = React.createContext()


const GlobalContextProvider = ({ children }) => {
    const repos = useGithub();

    return(
        <GlobalContext.Provider value={{ repos }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;