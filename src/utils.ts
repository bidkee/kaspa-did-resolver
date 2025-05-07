/**
 * Utility functions for kaspa-did-resolver.
 * Supports P2TR validation and checkCode for Bidkee 1.6 (artifact_id: e951682e-80ef-4367-a51f-44e3894cbeeb).
 */
import { createHash } from 'crypto';

/**
 * Validates a Kaspa P2TR address.
 * @param address - The address to validate.
 * @returns True if valid, false otherwise.
 */
export function validateP2TRAddress(address: string): boolean {
    // Kaspa P2TR address format: kaspa:p2tr:[32-byte Bech32 or hex]
    const regex = /^kaspa:p2tr:[0-9a-zA-Z]{42,64}$/;
    return regex.test(address);
}

/**
 * Generates SHA-256 checkCode for a DID.
 * @param did - The DID string.
 * @returns The checkCode (hex string).
 */
export function generateCheckCode(did: string): string {
    return createHash('sha256').update(did).digest('hex');
}
