export const SendRequest = (items) => {
  return () => {
    fetch("https://redux-auth-dd892-default-rtdb.firebaseio.com/test.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  };
};
