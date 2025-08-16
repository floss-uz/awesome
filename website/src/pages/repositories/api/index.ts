import { GITHUB_API_URL, GITHUB_API_VERSION } from "../config";
import axios from "axios";


export const fetchRepositores = async (userQuery?: string | null) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
      params: {
        q: userQuery,
        sort: 'stars'
      },
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION
      }
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    return Promise.reject(error)
  }
}