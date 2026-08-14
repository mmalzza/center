export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `요청에 실패했습니다. (${res.status})`);
  }
  return res.json() as Promise<T>;
}
