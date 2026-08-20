import type { AxiosResponse } from "axios";

export function saveBlobResponse(response: AxiosResponse<Blob>, fallbackFilename: string) {
  const disposition = response.headers["content-disposition"] as string | undefined;
  const filename = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? fallbackFilename;

  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
