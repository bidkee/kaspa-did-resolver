# Kaspa DID Resolver

A DID resolver for the `did:bidkee:kaspa` method, built for Bidkee 1.6 (artifact_id: e55e7453-5a30-4c0d-a737-10a2730423cb). It resolves decentralized identifiers (DIDs) on the Kaspa blockchain, supporting SHA-256 checkCodes, dual signatures (Schnorr/ECDSA), and integration with Veramo and Universal Resolver.

## Features
- Resolves `did:bidkee:kaspa` DIDs using Kaspa blockchain and IPFS.
- Validates P2TR addresses and generates SHA-256 checkCodes.
- Supports Bidkee 1.6 requirements, including dual signatures (placeholder for Kaspa Taproot).
- Integrates with Veramo for SSI applications.
- Compatible with Universal Resolver for cross-method DID resolution.

## Prerequisites
- **Node.js**: v22.15.0 or higher
- **npm**: v11.3.0 or higher
- **TypeScript**: v5.3.3 or higher
- **Kaspa Node**: Access to a Kaspa node (local or testnet, e.g., `https://api.kaspa.org`)
- **IPFS Gateway**: Access to an IPFS gateway (e.g., `https://ipfs.io`)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/kaspa-did-resolver.git
   cd kaspa-did-resolver
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Project**:
   Compile TypeScript to JavaScript:
   ```bash
   npm run build
   ```
   This generates the `dist/` directory with compiled files.

## Usage

### 1. Resolve a DID
Use the resolver to resolve a `did:bidkee:kaspa` DID. Create a test script (e.g., `test.ts`) to validate resolution:

```typescript
import { Resolver } from 'did-resolver';
import { getResolver } from './dist';

const config = {
  rpcUrl: 'http://kaspa-node:8080', // Replace with your Kaspa node URL
  ipfsGateway: 'http://ipfs-gateway:8080' // Replace with your IPFS gateway
};
const resolver = new Resolver(getResolver(config));

async function test() {
  try {
    const did = 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
    const result = await resolver.resolve(did);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error resolving DID:', error instanceof Error ? error.message : error);
  }
}

test();
```

Compile and run the script:
```bash
npx tsc test.ts
node test.js
```

**Expected Output** (with mocked responses):
```json
{
  "didDocument": {
    "id": "did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7",
    "idStructure": {
      "checkCode": "e313c681cf14af38bcffee15dc286c9a77106ab99c3f4add1235a662ae7dd56c"
    }
  },
  "didResolutionMetadata": { "contentType": "application/did+ld+json" },
  "didDocumentMetadata": { "created": "2025-05-07T12:00:00Z" }
}
```

### 2. Integrate with Veramo
Integrate the resolver with Veramo for self-sovereign identity (SSI) applications:

```typescript
import { createAgent, DIDManager, DIDResolverPlugin } from '@veramo/core';
import { getResolver } from './dist';

const config = {
  rpcUrl: 'http://kaspa-node:8080',
  ipfsGateway: 'http://ipfs-gateway:8080'
};

const agent = createAgent({
  plugins: [
    new DIDManager({ providers: {} }), // Placeholder for kaspa-did-provider
    new DIDResolverPlugin({ resolver: getResolver(config) })
  ]
});

async function test() {
  try {
    const did = 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
    const didDocument = await agent.resolveDid({ did });
    console.log(JSON.stringify(didDocument, null, 2));
  } catch (error) {
    console.error('Error resolving DID:', error instanceof Error ? error.message : error);
  }
}

test();
```

Install Veramo dependencies:
```bash
npm install @veramo/core @veramo/did-manager @veramo/did-resolver
```

Compile and run:
```bash
npx tsc veramo-test.ts
node veramo-test.js
```

### 3. Mock API for Testing
If a Kaspa node or IPFS gateway is unavailable, mock responses using `nock`:

```typescript
import nock from 'nock';
// Add to test.ts before resolving
const address = 'kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
const ipfsHash = 'Qm1234567890abcdef';
nock(config.rpcUrl)
  .get(`/address/${address}`)
  .reply(200, { opReturn: Buffer.from(ipfsHash).toString('hex'), timestamp: '2025-05-07T12:00:00Z' });
nock(config.ipfsGateway)
  .get(`/ipfs/${ipfsHash}`)
  .reply(200, {
    id: 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7',
    idStructure: { checkCode: 'e313c681cf14af38bcffee15dc286c9a77106ab99c3f4add1235a662ae7dd56c' }
  });
```

Install `nock`:
```bash
npm install --save-dev nock
```

## Testing
Run unit tests to validate the resolver and utility functions:
```bash
npm test
```

This uses Jest and `ts-jest` to execute tests in `src/__tests__/`. Expected output:
```
PASS  src/__tests__/resolver.test.ts
PASS  src/__tests__/utils.test.ts
Test Suites: 2 passed, 2 total
```

For verbose output:
```bash
npm test -- --verbose
```

## Configuration
- **Kaspa Node**: Set `rpcUrl` to a running Kaspa node (e.g., `https://api.kaspa.org` for testnet).
- **IPFS Gateway**: Set `ipfsGateway` to an IPFS gateway (e.g., `https://ipfs.io`).
- **Environment Variables** (optional):
  Create a `.env` file:
  ```env
  KASPA_RPC_URL=http://kaspa-node:8080
  IPFS_GATEWAY=http://ipfs-gateway:8080
  ```
  Update `test.ts` or `veramo-test.ts` to use `process.env`.

## Troubleshooting
- **404 Error on Kaspa API**:
  - Verify the Kaspa node is running:
    ```bash
    curl http://kaspa-node:8080
    ```
  - Use a testnet node: `https://api.kaspa.org`.
  - Mock API responses with `nock` (see above).
- **Module Not Found**:
  - Ensure `dist/` exists:
    ```bash
    npm run build
    ```
  - Reinstall dependencies:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
- **TypeScript Errors**:
  - Verify `tsconfig.json`:
    ```json
    {
      "compilerOptions": {
        "target": "es2018",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true
      }
    }
    ```

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

Please include tests for new features and update documentation as needed.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contact
For issues or questions, open a GitHub issue or contact the maintainers at [your-email@example.com].

---
*This project is part of the Bidkee 1.6 ecosystem, enhancing SSI with Kaspa blockchain integration.*