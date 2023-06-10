
import { APP_SERVER, CONTENT_TYPE, URI_REGISTER } from "../constants/AppStrings";
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${APP_SERVER}${URI_REGISTER}`, {
      method: 'POST',
      headers: {
        Accept: CONTENT_TYPE,
        'Content-Type': CONTENT_TYPE,
      },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Create request failed because: ${error})`);
  }
};

const authorizeUser = async (userAuthCredentials) => {
  try {
    const response = await fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAuthCredentials
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // Expect a body with user db details (including a uuid)
    // TODO: save uuid to local async storage
    const json = await response.json();
    // setData(json.user);
    return json;
  } catch (error) {
    console.error(error);
  } finally {
    // setLoading(false);
    console.log("Account auth successful")
  }
};