import { configureStore, UnknownAction } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        scroll: scrollReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function scrollReducer(state: unknown, action: UnknownAction): unknown {
    throw new Error('Function not implemented.');
}
