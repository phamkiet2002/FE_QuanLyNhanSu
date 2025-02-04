import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  PAYROLL: "Payroll",
};
//api tao bảng lương
const createPayroll = () => {
  return axiosCustomize.post(`${END_POINT.PAYROLL}`);
};
//api tinh lai luong
const caculatePayroll = () => {
  return axiosCustomize.put(
    `${END_POINT.PAYROLL}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
const payMent = (paymentData) => {
  return axiosCustomize.put(
    `${END_POINT.PAYROLL}/paid/${paymentData.id}`,
    paymentData
  );
};

export { createPayroll, caculatePayroll, payMent };
