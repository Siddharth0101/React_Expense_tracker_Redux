import { DisplaySliceActions } from "./DisplaySlice";

export const sendRequest = (items) => {
  return async () => {
    try {
      const response = await fetch(
        "https://redux-auth-dd892-default-rtdb.firebaseio.com/test.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        "https://redux-auth-dd892-default-rtdb.firebaseio.com/test.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch  data!");
      }

      const data = await response.json();
      return data;
    };
    try {
      const Data = await getData();
      console.log(Data);
      dispatch(DisplaySliceActions.ReplaceItems(Data || []));
    } catch (error) {}
  };
};
