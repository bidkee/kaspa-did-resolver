/**
 * Unit tests for utility functions.
 * Tests P2TR validation and checkCode for Bidkee 1.6 (artifact_id: e951682e-80ef-4367-a51f-44e3894cbeeb).
 */
import { validateP2TRAddress, generateCheckCode } from '../utils';

describe('Utils', () => {
    it('validates P2TR address', () => {
        const validAddress = 'kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
        const invalidAddress = 'kaspa:p2tr:invalid';
        expect(validateP2TRAddress(validAddress)).toBe(true);
        expect(validateP2TRAddress(invalidAddress)).toBe(false);
    });

    it('generates checkCode', () => {
        const did = 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
        const checkCode = generateCheckCode(did);
        expect(checkCode).toBe('e313c681cf14af38bcffee15dc286c9a77106ab99c3f4add1235a662ae7dd56c');
    });
});