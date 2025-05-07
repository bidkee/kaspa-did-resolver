/**
 * Type definitions for kaspa-did-resolver.
 * Configures Kaspa node and IPFS gateway for Bidkee 1.6 (artifact_id: e55e7453-5a30-4c0d-a737-10a2730423cb).
 */

/**
 * Configuration for Kaspa resolver.
 */
export interface KaspaProviderConfig {
  rpcUrl: string; // Kaspa node RPC endpoint (e.g., http://kaspa-node:8080)
  ipfsGateway: string; // IPFS gateway (e.g., http://ipfs-gateway:8080)
}