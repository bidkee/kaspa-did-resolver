"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unit tests for kaspa-did-resolver.
 * Tests did:bidkee:kaspa resolution for Bidkee 1.6 (artifact_id: e55e7453-5a30-4c0d-a737-10a2730423cb).
 */
const resolver_1 = require("../resolver");
const did_resolver_1 = require("did-resolver");
const nock_1 = __importDefault(require("nock"));
describe('Kaspa DID Resolver', () => {
    const config = {
        rpcUrl: 'http://kaspa-node:8080',
        ipfsGateway: 'http://ipfs-gateway:8080'
    };
    const resolver = new did_resolver_1.Resolver((0, resolver_1.getResolver)(config));
    it('resolves valid did:bidkee:kaspa', async () => {
        const did = 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
        const address = 'kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
        const ipfsHash = 'Qm1234567890abcdef';
        const didDocument = {
            id: did,
            idStructure: { checkCode: 'e313c681cf14af38bcffee15dc286c9a77106ab99c3f4add1235a662ae7dd56c' }
        };
        (0, nock_1.default)(config.rpcUrl)
            .get(`/address/${address}`)
            .reply(200, { opReturn: Buffer.from(ipfsHash).toString('hex'), timestamp: '2025-05-07T12:00:00Z' });
        (0, nock_1.default)(config.ipfsGateway)
            .get(`/ipfs/${ipfsHash}`)
            .reply(200, didDocument);
        const result = await resolver.resolve(did);
        expect(result.didDocument).toEqual(didDocument);
        expect(result.didResolutionMetadata.contentType).toBe('application/did+ld+json');
    });
    it('returns error for invalid DID', async () => {
        const did = 'did:bidkee:kaspa:invalid';
        const result = await resolver.resolve(did);
        expect(result.didDocument).toBeNull();
        expect(result.didResolutionMetadata.error).toBe('invalidDid');
    });
});
