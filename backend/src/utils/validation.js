export const validateTransactionData = (data) => {
  const { title, amount, category, user_id } = data;

  if (!title || !user_id || !category || amount === undefined) {
    return { isValid: false, message: "All fields are required" };
  }

  if (typeof amount !== "number") {
    return { isValid: false, message: "Amount must be a number" };
  }

  return { isValid: true };
};

export const validateUserId = (userId) => {
  if (!userId) {
    return { isValid: false, message: "User ID is required" };
  }
  return { isValid: true };
};

export const validateTransactionId = (id) => {
  if (!id) {
    return { isValid: false, message: "Transaction ID is required" };
  }
  return { isValid: true };
};
