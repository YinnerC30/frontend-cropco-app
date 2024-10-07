import { useSearchParams } from "react-router-dom";

export const useBasicQueryData = () => {
  const [URLSearchParams] = useSearchParams();
  const value = URLSearchParams.get("query") ?? "";
  return { value };
};
