import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getCrops = async ({
  search = "",
  limit = 10,
  offset = 0,
  allRecords,
}: Props) => {
  console.log(cropcoAPI);

  let params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  params.append("allRecords", allRecords.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.crops}/all?${params}`);
  return data;
};
