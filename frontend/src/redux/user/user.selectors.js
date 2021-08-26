import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserProfile = createSelector(
  [selectUser],
  (user) => user.profile
);

export const selectUserToken = createSelector(
  [selectUser],
  (user) => user.token
);

export const selectUserLoading = createSelector(
  [selectUser],
  (user) => user.loading
);
