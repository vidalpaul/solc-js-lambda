export type Request = {
  contractName: string;
  source: string;
  optimize?: boolean;
  solcVersion?: string;
  runs?: number;
};

export type Response = {
  bytecode: string;
  abi: string;
  gasEstimates?: {
    creation: {
      codeDepositCost: string;
      executionCost: string;
      totalCost: string;
    };
    external: {
      [functionName: string]: string;
    };
    internal: {
      [functionName: string]: string;
    };
  };
  methodsIdentifiers?: {
    [functionName: string]: string;
  };
  errors: string[];
};
