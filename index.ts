/* A simple example of a lambda function written in Typescript, for compiling Solidity contracts. */

import { Handler } from "aws-lambda";
import solc from "solc";

import { Request, Response } from "./types/dtos.model";

export const handler: Handler<Request, Response> = async (event) => {
  const {
    contractName,
    source,
    optimize = true,
    solcVersion = "0.8.21+commit.d9974bed",
    runs = 200,
  } = event;

  const input = {
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

  const compiler = await solc.loadRemoteVersion(solcVersion);

  const output = JSON.parse(compiler.compile(JSON.stringify(input)));

  if (output.errors) {
    return {
      bytecode: "",
      abi: "",
      errors: output.errors.map((error: any) => error.formattedMessage),
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
    bytecode,
    abi,
    gasEstimates,
    methodsIdentifiers,
    errors: [],
  };
};
