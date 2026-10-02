# Deskhand L1 support prototype

A local browser application for approved workplace troubleshooting and human handoffs. Python 3.10+ is required; no third-party Python packages are required.

## Start

Extract the archive first. Open a terminal in the `deskhand` folder.

- Windows: `py -3 server.py` (or double-click `start-windows.cmd`).
- macOS/Linux: `python3 server.py` (or run `sh start-macos-linux.sh`).
- Open **http://127.0.0.1:8765** in your browser.
- Stop with Ctrl+C. If the port is occupied, run `python server.py --port 8766` and use that port in the URL.

The server binds only to localhost. It is not a public deployment. Do not expose it through a proxy, tunnel or shared network without adding production authentication and authorisation.

## Use

1. Enter the office name and approved support contact.
2. Try the VPN, printer and login examples.
3. Download `office.json`, replace its example articles with approved procedures, then import it. The server validates the configuration on each support request.
4. Each article needs a unique ID, title, owner, review date (YYYY-MM-DD), keywords and steps. The review date is the latest date the article remains approved; expired articles are excluded.
5. Ask a question. Local mode selects guidance by keyword; it is not a language model. Unsupported, unsafe or unresolved issues produce human handoffs.
6. Choose **Hand off to IT**, then download the escalation draft. No helpdesk ticket is automatically created.

Configuration and conversation are held in page memory. Reloading resets both to server defaults. Download configuration to retain edits. **Clear session** clears conversation but keeps office setup. Exported drafts remain on your computer until you delete them. Clear session does not cancel an already dispatched AI request or delete provider-held data.

## Optional AI mode

Set these environment variables in the same terminal before starting:

PowerShell:

```powershell
$env:OPENAI_API_KEY = "your-key"
$env:OPENAI_MODEL = "your-responses-compatible-model"
$env:DESKHAND_ALLOW_EXTERNAL_AI = "1"
py -3 server.py
```

macOS/Linux:

```sh
export OPENAI_API_KEY="your-key"
export OPENAI_MODEL="your-responses-compatible-model"
export DESKHAND_ALLOW_EXTERNAL_AI=1
python3 server.py
```

Keys are server-side only; never put keys in office configuration. Model availability, provider connectivity and billing must be checked in your account. This delivery has not been tested with live credentials. The server performs real Responses API calls when configured; network failures produce a human handoff.

External AI is off by default and requires both operator enablement and a user checkbox. It sends the office name, support contact, current question, up to eight recent messages and matched articles to OpenAI. `store:false` is used, but this is not a guarantee of zero provider retention. AI calls are limited to ten per minute per running server; input and output sizes are bounded. This is a development cost guard, not production abuse prevention.

## Verification

Run backend tests:

```sh
python -m unittest discover -s tests -v
```

Run browser tests separately (Node.js 22+ and Playwright):

```sh
npm install --no-save playwright@1.62.1
npx playwright install chromium firefox webkit
```

Start the server in one terminal, then run `node tests/browser.cjs` in another. On Linux, Playwright may require its `--with-deps` installation. Browser tests exercise desktop and mobile viewport layouts, support flow, sources, handoff/download, clear/reload, HTML injection handling and configuration import. Missing browsers cause exit code 2; failed checks cause exit code 1.

The included GitHub Actions workflow runs backend tests on Windows, macOS and Linux with Python 3.10, 3.12 and 3.13, plus Chromium/Firefox/WebKit UI tests on Linux. It has not been run remotely. To use it, put the contents of this folder at the root of a repository, including `.github/workflows/test.yml`, then trigger the workflow. Browser emulation does not prove Safari on macOS or real iPhone/Android compatibility.

See TEST-REPORT.md for actual results and remaining coverage.

## Privacy and production boundary

Use synthetic data only in this prototype. It is not a GDPR compliance certification.

Implemented: localhost binding, origin/token checks, restricted static file serving, no request/conversation logging, no persistent conversation database, no browser local storage, basic email/labelled-secret redaction, no automated IT actions, no hidden external AI transmission.

Limitations: redaction misses many personal-data and secret formats; keyword risk checks and prompts are not comprehensive security controls; imported documents may contain unsafe instructions; model outputs require evaluation. There is no SSO, tenant isolation, role-based document access, organisational retention policy, subject-rights workflow, enterprise audit trail, helpdesk integration or production hosting.

Before employee-data use, complete an organisation-specific legal/privacy assessment, lawful-basis and transparency documentation, processor and transfer review, DPIA assessment, identity/document permission controls, retention/deletion design, security review, incident processes and end-to-end evaluation. Avoid assuming employee consent is the appropriate legal basis. Choose retention according to documented needs; do not adopt an arbitrary universal duration.

## Delivery scope and roadmap

The prior guide attachment could not be resolved in this session. This implementation follows the conversational scope and needs a guide reconciliation once the document is reattached.

- Tested local prototype: delivered, with the verification gaps in TEST-REPORT.md.
- Integrated pilot: estimate 3–5 weeks from access to approved documents, identity provider and one helpdesk platform.
- Production candidate: estimate 8–12 weeks from kickoff with an experienced engineer and part-time IT/security/privacy support; reviews and procurement can extend this.

Measure verified resolutions, appropriate escalation, unsupported-answer rate, source accuracy, privacy leakage and user satisfaction. No claim of being the best service is made without comparative evidence.
