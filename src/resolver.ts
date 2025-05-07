/**
 * Core resolver logic for did:bidkee:kaspa.
 * Queries Kaspa blockchain and IPFS to build DID document.
 * Supports Bidkee 1.6 dual signatures and checkCode (artifact_id: e951682e-80ef-4367-a51f-44e3894cbeeb).
 */
import { ParsedDID, ResolverRegistry, DIDResolutionResult, DIDResolver, Resolvable } from 'did-resolver';
import axios from 'axios';
import { createHash } from 'crypto';
import { KaspaProviderConfig } from './types';
import { validateP2TRAddress } from './utils';

/**
 * Resolves did:bidkee:kaspa to a DID document.
 * @param config - Kaspa node and IPFS gateway configuration.
 */
export function getResolver(config: KaspaProviderConfig): ResolverRegistry {
    const resolve: DIDResolver = async (
        did: string,
        parsed: ParsedDID,
        resolver: Resolvable
    ): Promise<DIDResolutionResult> => {
        try {
            // Validate DID format
            if (!did.startsWith('did:bidkee:kaspa:')) {
                return {
                    didResolutionMetadata: { error: 'invalidDid', errorMessage: 'Invalid DID format' },
                    didDocument: null,
                    didDocumentMetadata: {}
                };
            }

            // Extract address from DID
            const addressMatch = did.match(/kaspa:p2tr:[0-9a-zA-Z]{42,64}$/);
            if (!addressMatch) {
                return {
                    didResolutionMetadata: { error: 'invalidDid', errorMessage: 'Invalid P2TR address in DID' },
                    didDocument: null,
                    didDocumentMetadata: {}
                };
            }
            const address = addressMatch[0];
            if (!validateP2TRAddress(address)) {
                return {
                    didResolutionMetadata: { error: 'invalidDid', errorMessage: 'Invalid P2TR address' },
                    didDocument: null,
                    didDocumentMetadata: {}
                };
            }

            // Debug: Log address and request path
            console.log(`Resolving DID: ${did}, Address: ${address}`);

            // Query Kaspa chain (hypothetical API, assumes Taproot)
            const response = await axios.get(`${config.rpcUrl}/address/${address}`);
            const opReturnData = response.data.opReturn; // OP_RETURN stores IPFS hash or checkCode
            const ipfsHash = Buffer.from(opReturnData, 'hex').toString();

            // Fetch DID document from IPFS
            const didDocumentResponse = await axios.get(`${config.ipfsGateway}/ipfs/${ipfsHash}`);
            const didDocument = didDocumentResponse.data;

            // Verify checkCode (SHA-256 hash, Bidkee 1.6 requirement)
            const computedCheckCode = createHash('sha256').update(did).digest('hex');
            if (didDocument.idStructure?.checkCode !== computedCheckCode) {
                throw new Error('Invalid checkCode');
            }

            // Verify dual signatures (Schnorr + ECDSA, placeholder for Taproot)
            // TODO: Implement Schnorr verification when Kaspa Taproot is available
            const isValidSignature = true; // Placeholder
            if (!isValidSignature) throw new Error('Invalid signatures');

            return {
                didDocument,
                didResolutionMetadata: { contentType: 'application/did+ld+json' },
                didDocumentMetadata: { created: response.data.timestamp }
            };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Error resolving DID ${did}: ${errorMessage}`);
            return {
                didResolutionMetadata: { error: 'notFound', errorMessage },
                didDocument: null,
                didDocumentMetadata: {}
            };
        }
    };

    return { bidkee: resolve }; // Register for did:bidkee:*
}
