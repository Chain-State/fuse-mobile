
export const fetchListings = async () => {
  try {
    const response = await fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      method: "GET",
      headers: {
        'X-CMC_PRO_API_KEY': '14785900-0f5c-4f77-93dc-08fdd43d3a2e',
      },
    });
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // Expect a body with user db details (including a uuid)
      // TODO: save uuid to local async storage
      const json = await response.json();
      // setData(json.user);
      return json;
  } catch(ex) {
    // response = null;
    // error
    console.log(ex);
  }
//   if (response) {
//     // success
//     const json = response.json();
//     console.log(json);
//     resolve(json);
//   }
};


// KES ID 3547

export const fetchExchangeQuotes = async () => {
    try {
      const response = await fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'X-CMC_PRO_API_KEY': '14785900-0f5c-4f77-93dc-08fdd43d3a2e',
        },
      });
      if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // Expect a body with user db details (including a uuid)
        // TODO: save uuid to local async storage
        const json = await response.json();
        // setData(json.user);
        return json;
    } catch(ex) {
      // response = null;
      // error
      console.log(ex);
    }
  //   if (response) {
  //     // success
  //     const json = response.json();
  //     console.log(json);
  //     resolve(json);
  //   }
  };