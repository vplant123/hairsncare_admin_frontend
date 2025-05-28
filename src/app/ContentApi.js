// const BASE_URL = "https://backend.hairsncares.com/api/v1";
import BASE_URL from "../Config";
export const getUtilityData = async () => {
  const response = await fetch(`${BASE_URL}/utility/getContent`, {
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
