import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getPayments = async ({
  search = "",
  limit = 10,
  offset = 0,
  employee = "",
  after_date = "",
  before_date = "",
  filter_by_method_of_payment,
  method_of_payment = "",
  minor_total = 0,
  major_total = 0,
}: any) => {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  params.append("employee", employee.toString());

  if (after_date.length > 0) {
    params.append("after_date", new Date(after_date).toISOString());
  }
  if (before_date.length > 0) {
    params.append("before_date", new Date(before_date).toISOString());
  }
  if (minor_total != 0) {
    params.append("minor_total", minor_total.toString());
  }
  if (filter_by_method_of_payment) {
    params.append("filter_by_method_of_payment", "true");
    params.append("method_of_payment", method_of_payment.toString());
  }
  if (major_total != 0) {
    params.append("major_total", major_total.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.payments}?${params}`);
  return data;
};