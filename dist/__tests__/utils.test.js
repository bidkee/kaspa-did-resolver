"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unit tests for utility functions.
 * Tests P2TR validation and checkCode for Bidkee 1.6 (artifact_id: e951682e-80ef-4367-a51f-44e3894cbeeb).
 */
const utils_1 = require("../utils");
describe('Utils', () => {
    it('validates P2TR address', () => {
        const validAddress = 'kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
        const invalidAddress = 'kaspa:p2tr:invalid';
        expect((0, utils_1.validateP2TRAddress)(validAddress)).toBe(true);
        expect((0, utils_1.validateP2TRAddress)(invalidAddress)).toBe(false);
    });
    it('generates checkCode', () => {
        const did = 'did:bidkee:kaspa:kaspa:p2tr:qqz27k4jk9v4z5y9v6z4v7z9v8z0v9z1v2z3v4z5v6z7';
        const checkCode = (0, utils_1.generateCheckCode)(did);
        expect(checkCode).toBe('e313c681cf14af38bcffee15dc286c9a77106ab99c3f4add1235a662ae7dd56c');
    });
});
