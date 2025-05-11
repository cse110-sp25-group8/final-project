#!/bin/bash

echo "Validating JavaScript files..."

# Run ESLint with the new flat config
npx eslint "**/*.js"

# Capture the exit code
EXIT_CODE=$?

# Provide a clear message if there were errors
if [ $EXIT_CODE -ne 0 ]; then
    echo -e "\n JavaScript validation failed. Please fix the above errors.\n"
else
    echo -e "\n JavaScript validation passed. No issues found.\n"
fi

exit $EXIT_CODE

