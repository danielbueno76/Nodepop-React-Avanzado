export const messageSale = (sale) => {
  let message = "";
  if (sale) {
    message = "This product is available for sale.";
  } else {
    message = "I am looking for this product.";
  }
  return message;
};

export const MIN = 0;
export const MAX = 1000000;
export const BUY = "Buy";
export const SELL = "Sell";
