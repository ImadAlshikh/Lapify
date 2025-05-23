// app/api/proxy/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing URL" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");
    const data = await response.arrayBuffer();

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
