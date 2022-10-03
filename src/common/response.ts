export const success = (data: any) => {
  return {
    success: true,
    code: "200",
    mesaage: "Create sucessfully",
    data: data,
  };
};

export const failed = (data: any) => {
  return {
    success: false,
    code: "400",
    mesaage: "Operation failed",
    data: data,
  };
};

export const inputValidationError = (data: any) => {
  return {
    success: false,
    code: "400",
    mesaage: "Validation failed",
    data: data,
  };
};
