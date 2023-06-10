
export const createUser = async (userData) => {
  const { emailAddress, phoneNumber, password, firstName, lastName, dateOfBirth, idNumber } = userData;
  const SERVER = 'https://fusebox1.xyz';
  try {
    const response = await fetch(`${SERVER}/api/v1/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailAddress, phoneNumber, accountPassword: "QouwK19WtD_e0XI", firstName, lastName, dateOfBirth, idNumber }),
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