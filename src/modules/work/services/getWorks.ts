import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface Props {
  search: string;
  limit: number;
  offset: number;
  crop: string;
  after_date: string;
  before_date: string;
  minor_total: number;
  major_total: number;
}

export const getWorks = async ({
  search = "",
  limit = 10,
  offset = 0,
  crop = "",
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
}: Props) => {
  let params = new URLSearchParams();
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

  const { data } = await cropcoAPI.get(`${pathsCropco.works}?${params}`);
  return data;
};
