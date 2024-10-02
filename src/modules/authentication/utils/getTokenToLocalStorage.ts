const defaultValues = {
  token: "",
};

export const getTokenToLocalStorage = () => {
  const data = localStorage.getItem("user-active");
  if (!data) {
    return defaultValues;
  }
  return JSON.parse(data).token;
};
