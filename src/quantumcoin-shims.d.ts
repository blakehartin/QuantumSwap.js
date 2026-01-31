declare module "quantumcoin" {
  export type ContractRunner = any;
  export type TransactionResponse = any;
  export type ContractTransactionResponse = any;
  export type TransactionRequest = any;

  export class Contract {
    constructor(address: string, abi: any, runner?: any, bytecode?: any);
    target: string;
    address: string;
    interface: any;
    populateTransaction: any;
    call(methodName: string, args: any[], overrides?: TransactionRequest): Promise<any>;
    send(methodName: string, args: any[], overrides?: TransactionRequest): Promise<ContractTransactionResponse>;
    deployTransaction(): TransactionResponse | null;
  }

  export class ContractFactory {
    signer: any;
    constructor(abi: any, bytecode: string, signer: any);
    getDeployTransaction(...args: any[]): TransactionRequest;
  }

  export function getCreateAddress(opts: { from: string; nonce: number }): string;
}
