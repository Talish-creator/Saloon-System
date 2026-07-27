// Utility module for connecting to ERPNext REST API endpoints

export function getERPNextConfig() {
  const url = process.env.ERPNEXT_URL || "https://key.solutions.bitvera.co";
  const apiKey = process.env.ERPNEXT_API_KEY || "45ec974ff12c04b";
  const apiSecret = process.env.ERPNEXT_API_SECRET || "4179a5d5fc9909d";

  const isConfigured = Boolean(apiKey && apiSecret);

  return {
    url: url.replace(/\/$/, ""),
    apiKey,
    apiSecret,
    isConfigured,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(isConfigured ? { Authorization: `token ${apiKey}:${apiSecret}` } : {}),
    },
  };
}

export async function erpnextRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  const config = getERPNextConfig();
  const fullUrl = `${config.url}/api/${endpoint.replace(/^\//, "")}`;

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...config.headers,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `ERPNext Error [${res.status}]: ${errText}` };
    }

    const json = await res.json();
    return { success: true, data: json.data ?? json };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to connect to ERPNext API",
    };
  }
}
