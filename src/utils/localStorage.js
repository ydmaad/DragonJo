export const getLocalStorageKey = () => {
  return `sb-${import.meta.env.VITE_LOCAL_STORAGE_KEY}-auth-token`;
};
