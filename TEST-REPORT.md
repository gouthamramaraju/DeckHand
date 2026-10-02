# Verification report — 2 October 2026

| Area | Actual result |
|---|---|
| Python backend and HTTP integration | 25 tests passed on Linux / Python 3.12.14 |
| JavaScript syntax | `node --check static/app.js` passed |
| Local guidance and source references | Passed backend tests |
| Security, unknown issue and failure handoffs | Passed backend tests |
| Expired articles, invalid configurations and input bounds | Passed backend tests |
| Email/labelled-secret redaction | Passed targeted tests; incomplete coverage of sensitive data |
| Origin, host and request-token checks | Passed HTTP integration tests |
| Static routes, bootstrap and security headers | Passed HTTP integration tests |
| AI success, failure and payload controls | Passed with mocked provider; no live AI call |
| Chromium / Firefox / WebKit | Not executed: browser executables absent; installation attempt returned invalid download archive |
| Desktop / mobile layout and UI interaction | Browser suite provided; not verified here |
| Native Windows / macOS | CI matrix provided; not executed |
| Real Safari / iOS / Android | Not tested |
| Uploaded beginners guide conformance | Not verified: attachment download could not be resolved |
| Production GDPR compliance | Not assessed or certified |

Raw backend output is in test-results.txt. Browser availability output is in browser-results.json. Do not interpret the presence of browser tests or a CI workflow as evidence of passing them.

## Acceptance checks before a pilot

Run the included browser and cross-OS CI suites. Verify API access, model compatibility and a small live synthetic evaluation. Reconcile the reattached guide. Replace example articles, validate permissions and escalation ownership, and complete the privacy/security review. Run real mobile-device and Safari checks if those platforms are required.
