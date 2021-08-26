import { createSelector } from "reselect";

const selectFolder = (state) => state.folder;

export const selectFolders = createSelector(
  [selectFolder],
  (folder) => folder.folders
);

export const selectFolderLoading = createSelector(
  [selectFolder],
  (folder) => folder.loading
);
