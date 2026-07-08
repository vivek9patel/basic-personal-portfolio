export function getTarsEndpoint(): string | null {
  const endpoint =
    process.env.TARS_ENDPOINT || process.env.NEXT_PUBLIC_TARS_ENDPOINT;

  if (!endpoint || endpoint.trim() === '') {
    return null;
  }

  return endpoint.replace(/\/$/, '');
}
