"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCheckCode = exports.validateP2TRAddress = void 0;
/**
 * Utility functions for kaspa-did-resolver.
 * Supports P2TR validation and checkCode for Bidkee 1.6 (artifact_id: e951682e-80ef-4367-a51f-44e3894cbeeb).
 */
const crypto_1 = require("crypto");
/**
 * Validates a Kaspa P2TR address.
 * @param address - The address to validate.
 * @returns True if valid, false otherwise.
 */
function validateP2TRAddress(address) {
    // Kaspa P2TR address format: kaspa:p2tr:[32-byte Bech32 or hex]
    const regex = /^kaspa:p2tr:[0-9a-zA-Z]{42,64}$/;
    return regex.test(address);
}
exports.validateP2TRAddress = validateP2TRAddress;
/**
 * Generates SHA-256 checkCode for a DID.
 * @param did - The DID string.
 * @returns The checkCode (hex string).
 */
function generateCheckCode(did) {
    return (0, crypto_1.createHash)('sha256').update(did).digest('hex');
}
exports.generateCheckCode = generateCheckCode;
