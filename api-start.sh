#!/bin/bash
# update-env.sh - Get ngrok URL and update both env files

echo "🔄 Getting ngrok URL..."

# Get ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [ -z "$NGROK_URL" ] || [ "$NGROK_URL" = "null" ]; then
    echo "❌ Error: Could not get ngrok URL"
    echo "💡 Make sure ngrok is running: ngrok http 5173"
    exit 1
fi

echo "🌐 Ngrok URL: $NGROK_URL"

# Update both .env and .env.production files
update_env_file() {
    local env_file=$1
    if [ -f "$env_file" ]; then
        if grep -q "VITE_API_URL=" "$env_file"; then
            sed -i "s|VITE_API_URL=.*|VITE_API_URL=$NGROK_URL|" "$env_file"
            echo "✅ Updated $env_file"
        else
            echo "VITE_API_URL=$NGROK_URL" >> "$env_file"
            echo "✅ Added VITE_API_URL to $env_file"
        fi
    else
        echo "VITE_API_URL=$NGROK_URL" > "$env_file"
        echo "✅ Created $env_file"
    fi
}

update_env_file ".env"
update_env_file ".env.production"

# Git operations
echo "📦 Committing changes to git..."
git add .env .env.production
git commit -m "start server" --no-verify

echo "📤 Pushing to origin/main..."
git push origin main

echo "🎉 Done! Both env files updated and pushed to Vercel"
