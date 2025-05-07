/**
 * Core resolver logic for did:bidkee:kaspa.
 * Queries Kaspa blockchain and IPFS to build DID document.
 * Supports Bidkee 1.6 dual signatures and checkCode (artifact_id: e951682e-80ef-4367-a51f-44e3894cbeeb).
 */
import { ResolverRegistry } from 'did-resolver';
import { KaspaProviderConfig } from './types';
/**
 * Resolves did:bidkee:kaspa to a DID document.
 * @param config - Kaspa node and IPFS gateway configuration.
 */
export declare function getResolver(config: KaspaProviderConfig): ResolverRegistry;
