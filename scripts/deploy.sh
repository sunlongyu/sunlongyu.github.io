#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Go to project root (in case script is run from scripts directory)
cd "$(dirname "$0")/.."

# Build the project
echo -e "\033[0;32mBuilding the website...\033[0m"
hugo --cleanDestinationDir --gc --minify

# Check if build was successful
if [ ! -d "public" ]; then
    echo -e "\033[0;31mBuild failed! Public directory not found.\033[0m"
    exit 1
fi

# Initialize gh-pages branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo -e "\033[0;32mCreating gh-pages branch...\033[0m"
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout main
fi

# Deploy to gh-pages branch
echo -e "\033[0;32mDeploying to gh-pages branch...\033[0m"
git worktree add -f public-deploy gh-pages
cp -r public/* public-deploy/
cd public-deploy

git add .
msg="Deploy site $(date)"
if [ $# -eq 1 ]; then
    msg="$1"
fi
git commit -m "$msg"
git push origin gh-pages

# Clean up
cd ..
git worktree remove public-deploy

echo -e "\033[0;32mDeployment complete!\033[0m"
echo -e "\033[0;32mWebsite should be available at: https://sunlongyu.github.io\033[0m"
