type UnipileRawError = {
  message: string;
  body?: any;
};

export class UnipileError extends Error {
  body: any | undefined;

  constructor(raw: UnipileRawError) {
    super(raw.message);

    this.body = raw.body;
  }
}
