/**
 * Validates a Kaspa P2TR address.
 * @param address - The address to validate.
 * @returns True if valid, false otherwise.
 */
export declare function validateP2TRAddress(address: string): boolean;
/**
 * Generates SHA-256 checkCode for a DID.
 * @param did - The DID string.
 * @returns The checkCode (hex string).
 */
export declare function generateCheckCode(did: string): string;
