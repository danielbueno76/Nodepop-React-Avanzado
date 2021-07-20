export const messageSale = (sale) => {
  let message = "";
  if (sale) {
    message = "This product is available for sale.";
  } else {
    message = "I am looking for this product.";
  }
  return message;
};
export const LIMIT_NUMBER_ADS = 5;

const validUsername = ({ username }) => username;
const validEmail = ({ email }) => email;
const validPassword = ({ password }) => password;
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
      case "email":
        formFunction.push(validEmail);
        break;
      case "password":
        formFunction.push(validPassword);
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
