import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import bookingsSlice from './bookings/bookingsSlice';
import feedbackSlice from './feedback/feedbackSlice';
import promotionsSlice from './promotions/promotionsSlice';
import purchasesSlice from './purchases/purchasesSlice';
import roomsSlice from './rooms/roomsSlice';
import ticketsSlice from './tickets/ticketsSlice';
import socialmediadataSlice from './socialmediadata/socialmediadataSlice';
import revenueSlice from './revenue/revenueSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import organizationsSlice from './organizations/organizationsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    bookings: bookingsSlice,
    feedback: feedbackSlice,
    promotions: promotionsSlice,
    purchases: purchasesSlice,
    rooms: roomsSlice,
    tickets: ticketsSlice,
    socialmediadata: socialmediadataSlice,
    revenue: revenueSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    organizations: organizationsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
