import send from "@fastify/send";

export function getContentType(path: string): string | null {
  const type = send.mime.getType(path);

  if (!type || !send.isUtf8MimeType(type)) {
    return type;
  }
  return `${type}; charset=UTF-8`;
}
