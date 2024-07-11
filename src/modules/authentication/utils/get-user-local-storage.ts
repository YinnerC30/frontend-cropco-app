const defaultValues = {
  email: "",
  id: "",
  token: "",
};

export const getUserInLocalStorage = () => {
  const data = localStorage.getItem("user-active");
  if (!data) {
    return defaultValues;
  }
  return JSON.parse(data);
};
