declare namespace solc {
  interface SolcCompileOptionsSettings {
    outputSelection: any;
  }

  interface SolcCompileOptions {
    language: string;
    sources: any;
    settings: SolcCompileOptionsSettings;
  }

  interface SolcCompileError {
    component: string;
    formattedMessage: string;
  }

  interface SolcCompiled {
    errors: SolcCompileError[];
    contracts: any;
  }

  function compileStandardWrapper(
    source: string,
    options: SolcCompileOptions
  ): string;

  function compile(source: string | object): string;

  function loadRemoteVersion(
    version: string,
    callback?: (error: Error, solc: solc) => void
  ): Promise<solc>;
}

export = solc;
