import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  WIFICONFIG: "WifiConfig",
};

const getAllWifiConfig = () => {
  return axiosCustomize.get(`${END_POINT.WIFICONFIG}`, {});
};

const createWifiConfig = (wifiConfig) => {
  return axiosCustomize.post(`${END_POINT.WIFICONFIG}`, wifiConfig);
};
export { getAllWifiConfig, createWifiConfig };
