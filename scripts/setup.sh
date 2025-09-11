#!/bin/bash

# Development Setup Script for stox.bg
# This script sets up the development environment

set -e

echo "🚀 Setting up stox.bg development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please update it with your actual values."
else
    echo "✅ .env.local already exists"
fi

# Install Husky for git hooks
echo "🔧 Setting up git hooks..."
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint-staged"

# Add commit-msg hook for conventional commits
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your actual API keys and secrets"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run start        - Start production server"
echo "  npm run lint         - Run ESLint"
echo "  npm run lint:fix     - Fix ESLint issues"
echo "  npm run type-check   - Run TypeScript type checking"
echo "  npm run format       - Format code with Prettier"
echo "  npm run clean        - Clean build artifacts"
echo "  npm run seo:validate - Validate SEO implementation"
echo "  npm run seo:test     - Run Lighthouse SEO test"