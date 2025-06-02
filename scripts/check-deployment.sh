#!/bin/bash

echo "🚀 Checking deployment status..."
echo ""

# Check if the website is accessible
echo "📡 Checking website accessibility..."
if curl -s -o /dev/null -w "%{http_code}" https://sunlongyu.github.io | grep -q "200"; then
    echo "✅ Website is accessible at https://sunlongyu.github.io"
else
    echo "❌ Website is not accessible yet. This might take a few minutes after deployment."
fi

echo ""
echo "🔗 Useful links:"
echo "   📖 Website: https://sunlongyu.github.io"
echo "   📊 GitHub Actions: https://github.com/sunlongyu/sunlongyu.github.io/actions"
echo "   ⚙️  Repository: https://github.com/sunlongyu/sunlongyu.github.io"
echo "   📋 GitHub Pages Settings: https://github.com/sunlongyu/sunlongyu.github.io/settings/pages"
echo ""
echo "💡 If the website is not working:"
echo "   1. Check GitHub Actions for any build errors"
echo "   2. Ensure GitHub Pages is set to 'GitHub Actions' as source"
echo "   3. Wait a few minutes for DNS propagation"
