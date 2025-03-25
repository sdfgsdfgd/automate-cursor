# Cursor Automation Tool

A Node.js script to automate interactions with the Cursor IDE's AI agent using Puppeteer.

## Prerequisites

- Node.js installed
- Cursor IDE installed
- `puppeteer-core` package

## Setup

1. Install dependencies:
```bash
npm install puppeteer-core
```

2. Launch Cursor with remote debugging enabled:
```bash
Cursor --args --remote-debugging-port=9222
```

## Usage

Run the script with your query as an argument:

```bash
node index.js "Your query here"
```

Example:
```bash
node index.js "thx its all working perfectly :P"
```

## How It Works

The script:
1. Connects to Cursor's Chrome DevTools Protocol on port 9222
2. Checks if the AI agent input field is already visible
3. If not visible, triggers it with CMD+I (⌘+I)
4. Types your query and submits it
5. Automatically disconnects after sending the query

## Error Handling

The script includes error handling and will:
- Notify if it can't connect to Cursor
- Alert if the agent input field isn't found
- Clean up connections on exit

## TODO

- [ ] Add argument to optionally select window by repository name
- [ ] Add support for custom keyboard shortcuts
- [ ] Implement wait for response option 