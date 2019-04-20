import axios from "axios";

export async function get<T>(url: string): Promise<T> {
  const result: any = await axios.get(url, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  return result.data as T;
}