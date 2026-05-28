export function resolveChatApiUrl() {
  const configured = import.meta.env.VITE_CHAT_API_URL?.trim();
  if (configured) return configured;

  const base = import.meta.env.BASE_URL || "/";
  const withSlash = base.endsWith("/") ? base : `${base}/`;
  return `${withSlash}api/evelyn-chat`.replace(/([^:]\/)\/+/g, "$1");
}

export async function readChatApiJson(response) {
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const snippet = text.replace(/\s+/g, " ").trim().slice(0, 120);
    const looksLikeHtml =
      snippet.startsWith("<") || /the page/i.test(snippet) || /not found/i.test(snippet);

    if (looksLikeHtml) {
      throw new Error(
        "Chat API is not available on this host. GitHub Pages only serves static files. Run npm run dev locally, deploy on Vercel (this repo includes api/evelyn-chat), or set VITE_CHAT_API_URL to a live API endpoint.",
      );
    }

    throw new Error(`Chat API returned non-JSON: ${snippet || response.statusText}`);
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Chat API returned invalid JSON.");
  }
}
