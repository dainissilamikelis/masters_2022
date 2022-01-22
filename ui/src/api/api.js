import { ApiSettingsMaker } from ".";

async function callApi(url, settings) {
  const abortController = new AbortController();
  const { signal } = abortController;
  try {
    const response = await fetch(url, { ...settings, signal });
    if (response.status !== 200)
      throw new Error(
        `Fetch did not return OK status : ${JSON.stringify(response)}`
      );
    if (signal.aborted) {
      abortController.abort();
    }
    const data = await response.json();

    abortController.abort();
    if (data.errorType || data.errorMessage) {
      throw new Error(`Failed to fetch. Reason: ${data.errorMessage}`);
    }

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export const handleApi = (url, type, body = null) => {
  return callApi(url, ApiSettingsMaker(type, body));
};