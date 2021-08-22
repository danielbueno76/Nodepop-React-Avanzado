export const messageSale = (sale) => {
  let message = "";
  if (sale) {
    message = "This product is available for sale.";
  } else {
    message = "I am looking for this product.";
  }
  return message;
};

export const messageBooked = (booked) => {
  let message = "";
  if (booked) {
    message = "This product is booked.";
  } else {
    message = "This product is not booked.";
  }
  return message;
};

export const messageSold = (sold) => {
  let message = "";
  if (sold) {
    message = "This product is sold.";
  } else {
    message = "This product is not sold.";
  }
  return message;
};

export const orderAds = (order, ads) => {
  if (order === ASC) {
    ads.sort(function (a, b) {
      if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) {
        return 1;
      } else if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) {
        return -1;
      }
      return 0;
    });
  } else {
    ads.sort(function (a, b) {
      if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) {
        return 1;
      } else if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) {
        return -1;
      }
      return 0;
    });
  }
};
export const stepByDecimals = (num) => {
  switch (num) {
    case 1:
      return 0.1;
    case 2:
      return 0.01;
    case 3:
      return 0.001;
    case 4:
      return 0.0001;
    case 5:
      return 0.00001;
    case 6:
      return 0.000001;
    case 7:
      return 0.0000001;
    default:
      return 1;
  }
};

export const LIMIT_NUMBER_ADS = 5;

const validUsername = ({ username }) => username;
const validDescription = ({ description }) => description;
const validEmail = ({ email }) => email;
const validPassword = ({ password }) => password;
const validRepeatPassword = ({ password, "repeat password": repeatPassword }) =>
  password === repeatPassword;
const validName = ({ name }) => name;
const validPrice = ({ price }) => price;
const validSale = ({ sale }) => sale;
const validTags = ({ tags }) => tags.length;

export const keyToObjectValidate = (formValue) => {
  const formFunction = [];
  for (let key in formValue) {
    switch (key) {
      case "username":
        formFunction.push(validUsername);
        break;
      case "description":
        formFunction.push(validDescription);
        break;
      case "email":
        formFunction.push(validEmail);
        break;
      case "password":
        formFunction.push(validPassword);
        break;
      case "repeat password":
        formFunction.push(validRepeatPassword);
        break;
      case "name":
        formFunction.push(validName);
        break;
      case "price":
        formFunction.push(validPrice);
        break;
      case "sale":
        formFunction.push(validSale);
        break;
      case "tags":
        formFunction.push(validTags);
        break;
      default:
        break;
    }
  }
  return formFunction;
};

export const BUY = "Buy";
export const SELL = "Sell";
export const ASC = "FROM OLDEST TO NEWEST";
export const DESC = "FROM NEWEST TO OLDEST";
export const YOUR_ADS = "SHOW YOUR ADS";
export const FAV_ADS = "SHOW FAV ADS";
