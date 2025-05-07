"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_resolver_1 = require("did-resolver");
const dist_1 = require("../dist");
const config = {
    rpcUrl: 'https://api.kaspa.org',
    ipfsGateway: 'http://ipfs-gateway:8080'
};
const resolver = new did_resolver_1.Resolver((0, dist_1.getResolver)(config));
async function test() {
    const did = 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
    const result = await resolver.resolve(did);
    console.log(JSON.stringify(result, null, 2));
}
test();
