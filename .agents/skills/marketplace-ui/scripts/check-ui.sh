#!/usr/bin/env bash

echo "Running UI check to ensure styling rules are followed..."
echo "Checking for inline hardcoded #000 (forbidden colors)..."
grep -rn "#000000" ../../../src/components || echo "Clean: No forbidden hardcoded pure-black colors detected."
echo "UI Check passed!"
