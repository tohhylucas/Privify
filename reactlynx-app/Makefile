# ReactLynx Privacy Dashboard Makefile
# Compatible with Linux and macOS

.PHONY: start serve dev test clean install help

# Default target
start:
	@echo "Starting ReactLynx Privacy Dashboard..."
	@echo "Dashboard will be available at: http://localhost:8000"
	@echo "Press Ctrl+C to stop the server"
	@echo ""
	@if command -v python3 >/dev/null 2>&1; then \
		python3 -m http.server 8000; \
	elif command -v python >/dev/null 2>&1; then \
		python -m http.server 8000; \
	else \
		echo "Error: Python not found. Please install Python 3."; \
		exit 1; \
	fi

# Use Node.js http-server (requires npm install)
serve:
	@echo "Starting with http-server..."
	@npx http-server -p 8000 -o

# Development mode with live reload
dev:
	@echo "Starting development server with live reload..."
	@npx live-server --port=8000 --open=/

# Run test page
test:
	@echo "Opening test page..."
	@npx http-server -p 8000 -o /test.html &
	@sleep 2
	@echo "Test page should open automatically at http://localhost:8000/test.html"

# Install Node.js dependencies
install:
	@echo "Installing Node.js dependencies..."
	@npm install

# Clean up
clean:
	@echo "Cleaning up temporary files..."
	@rm -rf node_modules
	@rm -f package-lock.json

# Make shell script executable
setup:
	@echo "Setting up executable permissions..."
	@chmod +x start-server.sh
	@echo "Setup complete! You can now run: ./start-server.sh"

# Show help
help:
	@echo "ReactLynx Privacy Dashboard - Available commands:"
	@echo ""
	@echo "  make start    - Start server using Python (default)"
	@echo "  make serve    - Start server using Node.js http-server"
	@echo "  make dev      - Start development server with live reload"
	@echo "  make test     - Open test page"
	@echo "  make install  - Install Node.js dependencies"
	@echo "  make setup    - Make shell script executable"
	@echo "  make clean    - Clean up temporary files"
	@echo "  make help     - Show this help message"
	@echo ""
	@echo "Direct commands:"
	@echo "  ./start-server.sh    - Run shell script (after make setup)"
	@echo "  npm start            - Start using npm script"
	@echo "  npm run serve        - Start using http-server"
	@echo "  npm run dev          - Start with live reload"
