export const ValidatePhoneNumber = (phone: string, t?: Function) => {
  const cleanPhone = phone.replace(/[^\d]/g, "");

  if (!phone) {
    return t?.("error.phoneNo") || "Phone Number is Required";
  }

  if (cleanPhone?.length < 6) {
    return "Phone Number must be at Least 6 Digits";
  }

  if (cleanPhone?.length > 15) {
    return "Phone Number must be 15 Digits";
  }
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{6,15}$/;
  if (!phoneRegex.test(phone)) {
    return "Invalid Phone Number Format";
  }

  return "";
};

/*
  Mirrors the API rule (password: required|string|min:8). Enforcing it in the
  app matters because registration is only submitted on the LAST step -- a
  short password otherwise passes step 1 and is rejected after the driver has
  filled in documents, vehicle and bank details.

  Length is measured on the raw value, not a trimmed one, because the raw value
  is what gets submitted and what the server counts.
*/
export const PASSWORD_MIN_LENGTH = 8;

export const validatePassword = (value: string) => {
  if (!value || !value.trim()) {
    return "Please Enter Password";
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  return "";
};

export const validateEmail = (value: string, t?: Function) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!value) {
    return 'Please Enter Email';
  } else if (!emailRegex.test(value)) {
    return 'Please Enter Valid Email';
  }
  return "";
};