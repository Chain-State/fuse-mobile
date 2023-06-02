
export const createUser = async (userData) => {
  try {
    const response = await fetch('34.123.128.133:3000/api/v1/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // Expect a body with user db details (including a uuid)
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("User registration successful!")
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