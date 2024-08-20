import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface Props {
  search: string;
  limit: number;
  offset: number;
}

export const getWorks = async ({
  search = "",
  limit = 10,
  offset = 0,
}: Props) => {
  let params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.works}?${params}`);
  return data;
};
