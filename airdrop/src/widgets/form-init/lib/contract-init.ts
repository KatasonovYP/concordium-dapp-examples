import { AccountTransactionType, CcdAmount } from '@concordium/web-sdk';
import {
	CONTRACT_NAME,
	BASE_64_RAW_SCHEMA,
	MAX_CONTRACT_EXECUTION_ENERGY,
	MODULE_REFERENCE,
} from 'shared/config';
import {
	moduleSchemaFromBase64,
	WalletConnection,
} from '@concordium/react-components';
import { ContractInitParameters } from '../model/contract-init-parameters';

export function contractInit(
	connection: WalletConnection,
	account: string,
	parameters: ContractInitParameters,
): Promise<string> {
	return connection.signAndSendTransaction(
		account,
		AccountTransactionType.InitContract,
		{
			amount: new CcdAmount(BigInt(0)),
			moduleRef: MODULE_REFERENCE,
			initName: CONTRACT_NAME,
			maxContractExecutionEnergy: MAX_CONTRACT_EXECUTION_ENERGY,
		},
		{
			schema: moduleSchemaFromBase64(BASE_64_RAW_SCHEMA),
			parameters: { ...parameters },
		},
	);
}
