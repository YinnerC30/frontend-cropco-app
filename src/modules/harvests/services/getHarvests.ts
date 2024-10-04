import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getHarvests = async ({
  search = "",
  limit = 10,
  offset = 0,
  crop = "",
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
  minor_value_pay = 0,
  major_value_pay = 0,
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
  if (minor_total != 0) {
    params.append("minor_total", minor_total.toString());
  }
  if (major_total != 0) {
    params.append("major_total", major_total.toString());
  }
  if (minor_value_pay != 0) {
    params.append("minor_value_pay", minor_value_pay.toString());
  }
  if (major_value_pay != 0) {
    params.append("major_value_pay", major_value_pay.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.harvests}/all?${params}`);
  return data;
};
