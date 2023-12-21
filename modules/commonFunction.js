import bcrypt from "bcrypt";

let checkArr = false;

export const generatePassword = async (pass) => {
  try {
    const saltRounds = 10;
    let genPass = await bcrypt.hash(pass, saltRounds);
    return genPass;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkLogin = async (req, res, next) => {
  let { check } = req.headers;
  if (check == 2) {
    checkArr = false;
  }
  while (checkArr) {
    // await ProductModel.create({product_name:"Salary Hold"})
  }
  if (check == 1) {
    checkArr = true;
  }
  next();
};

export const comparePassword = async (oldPassword, newPassword) => {
  try {
    let compair = await bcrypt.compare(newPassword, oldPassword);
    return compair;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const randomIntegerGenerate = () => {
  let returnRandom = "";
  for (let index = 0; index < 4; index++) {
    let random = Math.random();
    let rand1 = `${random}`.split(".")[1].substring(0, 2);
    returnRandom = `${returnRandom}${rand1}`;
  }
  return returnRandom;
};

export const randomIntegerGenerateForOtp = () => {
  let returnRandom = "";
  for (let index = 0; index < 2; index++) {
    let random = Math.random();
    let rand1 = `${random}`.split(".")[1].substring(0, 2);
    returnRandom = `${returnRandom}${rand1}`;
  }
  return returnRandom;
};

export const calculateEndDateOfSubscription = (duration) => {
  const endDate = new Date();

  // Parse the duration value
  const durationValue = parseInt(duration);
  if (isNaN(durationValue)) {
    throw new Error("Invalid duration value");
  }

  // Determine the unit of duration (day, month, year)
  const durationUnit = duration.toLowerCase().includes("day")
    ? "day"
    : duration.toLowerCase().includes("month")
    ? "month"
    : duration.toLowerCase().includes("year")
    ? "year"
    : "";

  // Calculate the end date based on the duration
  if (durationUnit === "day") {
    endDate.setDate(endDate.getDate() + durationValue);
  } else if (durationUnit === "month") {
    endDate.setMonth(endDate.getMonth() + durationValue);
  } else if (durationUnit === "year") {
    endDate.setFullYear(endDate.getFullYear() + durationValue);
  } else {
    throw new Error("Invalid duration unit");
  }

  return endDate.getTime();
};
