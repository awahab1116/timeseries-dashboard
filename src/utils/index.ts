import { format, subDays } from "date-fns";

//to get x days before today data if sub is passed and if not passed it will return today's date
export const getDate = (sub: number = 0) => {
  return format(subDays(new Date(), sub), "dd/MM/yyyy");
};
