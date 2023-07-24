export type LambdaRequest = {
  contractName: string;
  source: string;
  optimize?: boolean;
  solcVersion?: string;
  runs?: number;
};

export type OutputError = {
  formattedMessage: string;
};
