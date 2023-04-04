export const globalReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER': {
        return {
          ...state,
          user: action.payload.user,
        };
      }

      case 'SET_IS_AUTHENTICATED': {
        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated,
        };
      }   
     
      default: {
        throw Error('unknown action: ' + action.type);
      }
    }
  };