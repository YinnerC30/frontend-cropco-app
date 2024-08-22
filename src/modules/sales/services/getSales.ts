import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface Props {
  search: string;
  limit: number;
  offset: number;
  after_date: string;
  before_date: string;
  minor_total: number;
  major_total: number;
  minor_quantity: number;
  major_quantity: number;
  filter_by_is_receivable: boolean | Boolean;
  is_receivable: boolean | Boolean;
}

export const getSales = async ({
  search = "",
  limit = 10,
  offset = 0,
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
  minor_quantity = 0,
  major_quantity = 0,
  filter_by_is_receivable,
  is_receivable,
}: Props) => {
  let params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

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
  if (minor_quantity != 0) {
    params.append("minor_quantity", minor_quantity.toString());
  }
  if (major_quantity != 0) {
    params.append("major_quantity", major_quantity.toString());
  }
  if (filter_by_is_receivable) {
    params.append("filter_by_is_receivable", "true");
    params.append("is_receivable", is_receivable.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.sales}?${params}`);
  return data;
};
