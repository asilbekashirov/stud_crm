import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './app'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
	version: 1
}

export const rootReducer = combineReducers({
	app: appReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
	return configureStore({
		reducer: persistedReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			}).concat([])
	})
}

const store = setupStore()
export const persistor = persistStore(store)
export default store

export type RootReducer = ReturnType<typeof rootReducer>
export type RootStore = ReturnType<typeof setupStore>
export type RootDispatch = RootStore['dispatch']
