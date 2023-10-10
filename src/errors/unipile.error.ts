type UnipileRawError = {
  message: string;
  body?: unknown;
};

export class UnipileError extends Error {
  body: unknown | undefined;

  constructor(raw: UnipileRawError) {
    super(raw.message);

    this.body = raw.body;
  }
}
