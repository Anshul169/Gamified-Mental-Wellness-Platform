import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import UserReducer from './UserReducer.js';
const persistConfig = {
    key:'root',
    storage,
    version:1,
}

const rootReducer = combineReducers({
    user:UserReducer
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false});
    }
})


export const persistor = persistStore(store);
