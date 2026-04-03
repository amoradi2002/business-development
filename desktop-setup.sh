#!/usr/bin/env bash
# Run this on your Mac to set up notebooklm-py and log in
# Usage: bash desktop-setup.sh

set -euo pipefail

echo "=== NotebookLM Desktop Setup ==="

# Check for Python
if ! command -v python3 &>/dev/null; then
    echo "Error: Python 3 not found. Install it first:"
    echo "  brew install python"
    exit 1
fi

# Check for uv (faster) or fall back to pip
if command -v uv &>/dev/null; then
    INSTALLER="uv"
else
    INSTALLER="pip"
    echo "Tip: Install 'uv' for faster setup: brew install uv"
fi

# Clone if needed
if [ ! -d "notebooklm-py" ]; then
    git clone https://github.com/teng-lin/notebooklm-py.git
fi

cd notebooklm-py

# Set up venv
if [ "$INSTALLER" = "uv" ]; then
    uv venv .venv
    source .venv/bin/activate
    uv pip install -e ".[browser]"
else
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -e ".[browser]"
fi

# Install browser for login
playwright install chromium

echo ""
echo "=== Setup complete! Logging in... ==="
echo ""

# Log in
notebooklm login

echo ""
echo "=== Done! ==="
echo "Auth saved to: ~/.notebooklm/profiles/default/storage_state.json"
echo ""
echo "To use on a remote server, copy the auth file:"
echo "  scp ~/.notebooklm/profiles/default/storage_state.json user@server:~/.notebooklm/profiles/default/"
