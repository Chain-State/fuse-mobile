import { URI_USER_ASSETS } from "../constants/AppStrings";

const fetchAssets = async (userUuid) => {
    try {
        const response = await fetch(`${URI_USER_ASSETS}/${userUuid}`);
        const result = await response.json();
        console.log(`Assets: ${JSON.stringify(result)}`);
        return result;

    } catch (error) {

        console.log(`Failed to fetch user assets: ${error}`);
    }
}

export { fetchAssets };