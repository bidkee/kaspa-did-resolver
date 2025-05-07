"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
/**
 * Main entry point for kaspa-did-resolver.
 * Exports getResolver() for integration with did-resolver and Veramo.
 * Adapted for Bidkee 1.6 (artifact_id: e55e7453-5a30-4c0d-a737-10a2730423cb).
 */
const resolver_1 = require("./resolver");
/**
 * Returns resolver for did:bidkee:kaspa.
 * @param config - Kaspa node and IPFS gateway configuration.
 */
function getResolver(config) {
    return (0, resolver_1.getResolver)(config);
}
exports.getResolver = getResolver;
