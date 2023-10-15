import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/RootReducer'
import { AuthApi } from './auth/AuthApi'


export const store = configureStore({
    reducer: {rootReducer},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
  },window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())