/**
 * Regression tests — API URL resolution logic
 * ────────────────────────────────────────────
 * Verifies that `resolveApiBaseUrl` produces the correct base URL for every
 * combination of environment variable, hostname, protocol, and port that the
 * app is expected to encounter.
 *
 * Run with:
 *   node tests/api-resolution.test.js
 *
 * No external test runner required — uses Node's built-in `assert` module.
 */

'use strict';

const assert = require('assert');
const { resolveApiBaseUrl, LOCAL_HOSTS } = require('../Frontend/js/api.js');

// ─── tiny test harness ────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`  ✓  ${description}`);
        passed++;
    } catch (err) {
        console.error(`  ✗  ${description}`);
        console.error(`     Expected: ${err.expected}`);
        console.error(`     Received: ${err.actual}`);
        failed++;
    }
}

function assertEqual(actual, expected, message) {
    assert.strictEqual(actual, expected, message);
}

// ─── Test Suite: resolveApiBaseUrl ────────────────────────────────────────────
console.log('\n┌─ resolveApiBaseUrl() ─────────────────────────────────────────┐');

// ── 1. Environment variable ───────────────────────────────────────────────────
console.log('\n  [ Priority 1: NEXT_PUBLIC_API_URL env var ]');

test('Uses envApiUrl verbatim when set (HTTPS)', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: 'https://api.placementpro.io/api',
        hostname:  'localhost',   // would pick http: otherwise
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'https://api.placementpro.io/api');
});

test('Strips trailing slash from envApiUrl', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: 'https://api.placementpro.io/api/',
        hostname:  'localhost',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'https://api.placementpro.io/api');
});

test('Strips multiple trailing slashes from envApiUrl', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: 'https://api.placementpro.io/api///',
        hostname:  'other.host',
        protocol:  'https:',
        envPort:   null,
    });
    assertEqual(result, 'https://api.placementpro.io/api');
});

test('envApiUrl overrides local hostname (env takes priority even on localhost)', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: 'https://staging.placementpro.io/api',
        hostname:  '127.0.0.1',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'https://staging.placementpro.io/api');
});

test('Empty string envApiUrl falls through to hostname logic', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: '',
        hostname:  'localhost',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'http://localhost:5000/api');
});

test('Whitespace-only envApiUrl falls through to hostname logic', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: '   ',
        hostname:  'localhost',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'http://localhost:5000/api');
});

// ── 2. Local development override ────────────────────────────────────────────
console.log('\n  [ Priority 2: Local development override ]');

test('localhost always uses http: (default port 5000)', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'localhost',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'http://localhost:5000/api');
});

test('127.0.0.1 always uses http: (default port 5000)', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  '127.0.0.1',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'http://127.0.0.1:5000/api');
});

test('::1 (IPv6 loopback) always uses http:', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  '::1',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'http://::1:5000/api');
});

test('localhost with https: page protocol still uses http: (HTTPS tunnel scenario)', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'localhost',
        protocol:  'https:',  // e.g., behind ngrok
        envPort:   null,
    });
    assertEqual(result, 'http://localhost:5000/api');
});

test('127.0.0.1 with https: page still uses http:', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  '127.0.0.1',
        protocol:  'https:',
        envPort:   null,
    });
    assertEqual(result, 'http://127.0.0.1:5000/api');
});

test('Custom envPort respected on localhost', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'localhost',
        protocol:  'http:',
        envPort:   '8080',
    });
    assertEqual(result, 'http://localhost:8080/api');
});

test('Custom envPort with whitespace is trimmed', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'localhost',
        protocol:  'http:',
        envPort:   '  9000  ',
    });
    assertEqual(result, 'http://localhost:9000/api');
});

test('Empty hostname (file:// / local file open) falls back to 127.0.0.1', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  '',
        protocol:  'file:',
        envPort:   null,
    });
    // '' is in LOCAL_HOSTS, so uses http:, and hostname || '127.0.0.1'
    assertEqual(result, 'http://127.0.0.1:5000/api');
});

// ── 3. Production / protocol-mirror fallback ──────────────────────────────────
console.log('\n  [ Priority 3: Protocol-mirror for non-local hosts ]');

test('HTTPS production host mirrors https:', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'app.placementpro.io',
        protocol:  'https:',
        envPort:   null,
    });
    assertEqual(result, 'https://app.placementpro.io:5000/api');
});

test('HTTP production host mirrors http:', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'staging.placementpro.io',
        protocol:  'http:',
        envPort:   null,
    });
    assertEqual(result, 'http://staging.placementpro.io:5000/api');
});

test('Production host uses envPort when set', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'app.placementpro.io',
        protocol:  'https:',
        envPort:   '443',
    });
    assertEqual(result, 'https://app.placementpro.io:443/api');
});

test('Production host with file: protocol falls back to http:', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'app.placementpro.io',
        protocol:  'file:',
        envPort:   null,
    });
    assertEqual(result, 'http://app.placementpro.io:5000/api');
});

test('No trailing slash on protocol-mirror result', () => {
    const result = resolveApiBaseUrl({
        envApiUrl: null,
        hostname:  'app.placementpro.io',
        protocol:  'https:',
        envPort:   null,
    });
    assert.ok(!result.endsWith('/'), 'Result must not end with /');
});

// ── 4. LOCAL_HOSTS membership ─────────────────────────────────────────────────
console.log('\n  [ LOCAL_HOSTS set membership ]');

test('LOCAL_HOSTS contains localhost', () => {
    assert.ok(LOCAL_HOSTS.has('localhost'));
});

test('LOCAL_HOSTS contains 127.0.0.1', () => {
    assert.ok(LOCAL_HOSTS.has('127.0.0.1'));
});

test('LOCAL_HOSTS contains ::1 (IPv6 loopback)', () => {
    assert.ok(LOCAL_HOSTS.has('::1'));
});

test('LOCAL_HOSTS contains empty string (file:// scenario)', () => {
    assert.ok(LOCAL_HOSTS.has(''));
});

test('LOCAL_HOSTS does NOT contain a real production host', () => {
    assert.ok(!LOCAL_HOSTS.has('app.placementpro.io'));
});

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('\n└───────────────────────────────────────────────────────────────┘');
console.log(`\n  Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
    process.exit(1);
}
