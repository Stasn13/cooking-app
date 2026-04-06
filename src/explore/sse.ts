type ParsedSseBlock = {
  event: string;
  payload: string;
};

export function tryParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function parseSseBlock(block: string): ParsedSseBlock | null {
  const trimmed = block.trim();

  if (!trimmed || trimmed.startsWith(":")) {
    return null;
  }

  const lines = block.split(/\r?\n/);
  let event = "message";
  const data: string[] = [];

  for (const line of lines) {
    if (!line || line.startsWith(":")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    const field = separatorIndex === -1 ? line : line.slice(0, separatorIndex);
    let value = separatorIndex === -1 ? "" : line.slice(separatorIndex + 1);

    if (value.startsWith(" ")) {
      value = value.slice(1);
    }

    if (field === "event") {
      event = value || "message";
      continue;
    }

    if (field === "data") {
      data.push(value);
    }
  }

  if (data.length === 0) {
    return null;
  }

  return {
    event,
    payload: data.join("\n"),
  };
}
