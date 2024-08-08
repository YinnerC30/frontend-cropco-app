import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getHarvests = async ({
  search = "",
  limit = 10,
  offset = 0,
  crop = "",
  after_date = "",
  before_date = "",
}) => {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  params.append("crop", crop.toString());
  if (after_date.length > 0) {
    params.append("after_date", new Date(after_date).toISOString());
  }
  if (before_date.length > 0) {
    params.append("before_date", new Date(before_date).toISOString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.harvests}?${params}`);
  return data;
};
