import {
    createContext,
    useContext,
    useEffect,
  } from "react";
  import { useAuth } from "./authContext";
  export type SessionContextType = {
  };
  
  export const SessionContext = createContext({} as SessionContextType);
  
  export function SessionContextProvider(props: any) {
    const auth = useAuth();

    //First Run Update
    useEffect(() => {
      if (auth.status === "authenticated") {
        // AAA
      }
    }, [auth.status]);

  
    const values: SessionContextType = {
    };
  
    return (
      <SessionContext.Provider value={values}>
        {props.children}
      </SessionContext.Provider>
    );
  }
  
  export const useSession = () => useContext(SessionContext);
  