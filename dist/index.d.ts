import { KaspaProviderConfig } from './types';
/**
 * Returns resolver for did:bidkee:kaspa.
 * @param config - Kaspa node and IPFS gateway configuration.
 */
export declare function getResolver(config: KaspaProviderConfig): import("did-resolver").ResolverRegistry;
