#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Go to project root (in case script is run from scripts directory)
cd "$(dirname "$0")/.."

# Add all changes to git
git add .

# Commit changes
msg="Update site content $(date)"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push to main branch (GitHub Actions will handle the build and deployment)
git push origin main

echo -e "\033[0;32mPushed to main branch. GitHub Actions will build and deploy the site.\033[0m"
