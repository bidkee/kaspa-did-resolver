"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
const utils_1 = require("./utils");
/**
 * Resolves did:bidkee:kaspa to a DID document.
 * @param config - Kaspa node and IPFS gateway configuration.
 */
function getResolver(config) {
    const resolve = async (did, parsed, resolver) => {
        var _a;
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
            if (!(0, utils_1.validateP2TRAddress)(address)) {
                return {
                    didResolutionMetadata: { error: 'invalidDid', errorMessage: 'Invalid P2TR address' },
                    didDocument: null,
                    didDocumentMetadata: {}
                };
            }
            // Debug: Log address and request path
            console.log(`Resolving DID: ${did}, Address: ${address}`);
            // Query Kaspa chain (hypothetical API, assumes Taproot)
            const response = await axios_1.default.get(`${config.rpcUrl}/address/${address}`);
            const opReturnData = response.data.opReturn; // OP_RETURN stores IPFS hash or checkCode
            const ipfsHash = Buffer.from(opReturnData, 'hex').toString();
            // Fetch DID document from IPFS
            const didDocumentResponse = await axios_1.default.get(`${config.ipfsGateway}/ipfs/${ipfsHash}`);
            const didDocument = didDocumentResponse.data;
            // Verify checkCode (SHA-256 hash, Bidkee 1.6 requirement)
            const computedCheckCode = (0, crypto_1.createHash)('sha256').update(did).digest('hex');
            if (((_a = didDocument.idStructure) === null || _a === void 0 ? void 0 : _a.checkCode) !== computedCheckCode) {
                throw new Error('Invalid checkCode');
            }
            // Verify dual signatures (Schnorr + ECDSA, placeholder for Taproot)
            // TODO: Implement Schnorr verification when Kaspa Taproot is available
            const isValidSignature = true; // Placeholder
            if (!isValidSignature)
                throw new Error('Invalid signatures');
            return {
                didDocument,
                didResolutionMetadata: { contentType: 'application/did+ld+json' },
                didDocumentMetadata: { created: response.data.timestamp }
            };
        }
        catch (error) {
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
exports.getResolver = getResolver;
