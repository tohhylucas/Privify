#!/bin/bash

# ReactLynx Privacy Dashboard Server Starter
# Compatible with Linux and macOS

echo "Starting ReactLynx Privacy Dashboard..."
echo ""
echo "The dashboard will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    # Check if it's Python 3
    PYTHON_VERSION=$(python --version 2>&1 | grep -o "Python 3")
    if [ "$PYTHON_VERSION" = "Python 3" ]; then
        echo "Using Python..."
        python -m http.server 8000
    else
        echo "Error: Python 3 is required but Python 2 was found."
        echo "Please install Python 3 or use 'python3' command."
        exit 1
    fi
else
    echo "Error: Python is not installed or not in PATH."
    echo "Please install Python 3 from https://python.org"
    exit 1
fi
