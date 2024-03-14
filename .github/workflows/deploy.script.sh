#!/bin/bash

# Install dependencies
npm install --legacy-peer-deps

# Execute nx-cloud command
npx nx-cloud start-ci-run --distribute-on="5 linux-medium-js" --stop-agents-after="e2e-ci"

# Run nx-set-shas
npx nrwl/nx-set-shas@v4.0.4

# Create dynamic branch
branch_name="develop-$(date +%Y-%m-%d-%H-%M-%S)"
git branch --track $branch_name origin/develop

# Build the application
npx nx build authoring-web --parallel=10
