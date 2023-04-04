import React, { createContext, useEffect, useReducer , useState } from 'react';
import { authentication } from '@/lib/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { globalReducer } from '../reducers/globalReducers';
// import { InitialUserState, useUser } from './user'

const initialState = {
  user: {},
  isAuthenticated: false,
};

export const GlobalContext = createContext(initialState);
export const GlobalDispatchContext = createContext(null);

// metod fungsi untuk mengetahui apakah user sedang login (authenticated) atau tidak 

const GlobalContextProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)

  const [state, dispatch] = useReducer(globalReducer, initialState);


  const InitiateAuthStateChange = () => {
    authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is authenticated')
        dispatch({
          type: 'SET_IS_AUTHENTICATED',
          payload: {
            isAuthenticated: true,
          },
        });
      } else{
        console.log('User is not authenticated')
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    InitiateAuthStateChange()
  }, [])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
  
}

export default GlobalContextProvider;

