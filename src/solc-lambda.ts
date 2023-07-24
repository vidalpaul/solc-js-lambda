import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
  wrapper,
  Input,
  download,
  createRequire,
  LambdaRequest,
  OutputError,
} from "../deps.ts";

export default async function handler(
  event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResultV2> {
  const {
    contractName,
    source,
    optimize = true,
    solcVersion = "0.8.21+commit.d9974bed",
    runs = 200,
  }: LambdaRequest = event.body ? JSON.parse(event.body) : {};

  await download("", solcVersion);

  const input: Input = {
    language: "Solidity",
    sources: {
      [contractName]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode.object"],
        },
      },
      optimizer: {
        enabled: optimize,
        runs,
      },
    },
  };

  const compiler = await wrapper(
    createRequire(import.meta.url)("./soljson.js")
  );

  const output = JSON.parse(compiler.compile(JSON.stringify(input)));

  if (output.errors) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        bytecode: "",
        abi: "",
        errors: output.errors.map(
          (error: OutputError) => error.formattedMessage
        ),
      }),
    };
  }

  const {
    evm: {
      bytecode: { object: bytecode },
      methodsIdentifiers,
      gasEstimates,
    },
    abi,
  } = output.contracts[`${contractName}.sol`][contractName];

  return {
    statusCode: 200,
    body: JSON.stringify({
      bytecode,
      abi,
      gasEstimates,
      methodsIdentifiers,
      errors: [],
    }),
  };
}
