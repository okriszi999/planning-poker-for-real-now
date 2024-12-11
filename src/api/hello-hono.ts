import { LOCAL_API } from "@/constants";

export async function helloHono() {
  const response = await fetch(`${LOCAL_API}/api/hello`);
  const data = await response.json();

  return data;
}
