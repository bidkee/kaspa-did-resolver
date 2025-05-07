/**
 * Main entry point for kaspa-did-resolver.
 * Exports getResolver() for integration with did-resolver and Veramo.
 * Adapted for Bidkee 1.6 (artifact_id: e55e7453-5a30-4c0d-a737-10a2730423cb).
 */
import { getResolver as getKaspaResolver } from './resolver';
import { KaspaProviderConfig } from './types';

/**
 * Returns resolver for did:bidkee:kaspa.
 * @param config - Kaspa node and IPFS gateway configuration.
 */
export function getResolver(config: KaspaProviderConfig) {
  return getKaspaResolver(config);
}