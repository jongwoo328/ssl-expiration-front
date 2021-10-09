import axios from "axios";

const baseUrl = "https://ssl-api.jongwoo.me";

export async function getAllDomainExpire() {
  const result = await axios.get(`${baseUrl}/domains`);
  return result.data;
}

export async function getDomainExpire(domain) {
  const query = {
    q: domain,
  };

  const result = await axios.get(`${baseUrl}/domain`, { params: query });
  return result.data;
}
