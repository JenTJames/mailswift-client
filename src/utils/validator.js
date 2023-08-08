export const isEmpty = (value) => {
  if (value === "") {
    return {
      isValid: false,
      message: "This field is mandatory",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

export const noValidate = () => {
  return {
    isValid: true,
    message: "",
  };
};
