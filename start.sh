#!/bin/bash

# Function to open a new tab and execute a command
function open_tab() {
  osascript -e "tell application \"Terminal\" to do script \"cd $1; $2\""
}

# Get the current directory
current_dir=$(pwd)

# Start React servers in different tabs
open_tab "$current_dir/frontend/student" "npm run dev"
open_tab "$current_dir/frontend/finance" "npm run dev"
