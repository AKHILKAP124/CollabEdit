import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web 

// Import slices
import EditorSlice from './EditorSlice'; // Assuming you have an EditorSlice for editor-related state
import UserSlice from './userSlice'; // Assuming you have a UserSlice for user-related state
import SnippetSlice from './snippetSlice'; // Assuming you have a SnippetSlice for snippet-related state

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    editor: EditorSlice,
    user: UserSlice,
    snippets: SnippetSlice,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store); // Persistor for persisting state to storage  
export default store;