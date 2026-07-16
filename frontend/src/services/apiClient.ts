const DEFAULT_API_BASE_URL = "http://127.0.0.1:5000";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || DEFAULT_API_BASE_URL;

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function readErrorMessage(response: Response) {
  try {
    const payload: unknown = await response.clone().json();
    if (payload && typeof payload === "object") {
      const record = payload as Record<string, unknown>;
      const message = record.error ?? record.message ?? record.detail;
      if (typeof message === "string" && message.trim()) {
        return message.trim();
      }
    }
  } catch {
    try {
      const text = await response.text();
      if (text.trim()) return text.trim();
    } catch {
      // Fall through to the generic message below.
    }
  }

  return `Request failed with status ${response.status}.`;
}

export async function postFormData<T>(
  path: string,
  formData: FormData,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      body: formData,
      signal,
    });
  } catch (error) {
    // Preserve cancellation so callers can intentionally ignore an invalidated request.
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new ApiError(
      "Could not reach the Flask backend. Confirm it is running at http://127.0.0.1:5000 and that CORS is enabled.",
    );
  }

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response));
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError("The backend returned a response that was not valid JSON.");
  }
}
