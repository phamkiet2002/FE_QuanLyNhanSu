import axiosCustomize from '../Utils/axiosCustomize';

const END_POINT = {
    TYPEOFALLOWANCE: "Enum/enum-type-of-allowance",
    TYPEOFPENALTY: "Enum/enum-type-of-penalty",
}

const getAllTypeOfAllowance = () => {
    return axiosCustomize.get(`${END_POINT.TYPEOFALLOWANCE}`);
};

const getAllTypeOfPenalty = () => {
    return axiosCustomize.get(`${END_POINT.TYPEOFPENALTY}`);
};

export { getAllTypeOfAllowance, getAllTypeOfPenalty };
