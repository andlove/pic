#!/bin/bash

# Define file URLs
BATCH_COPY_URL="https://raw.githubusercontent.com/andlove/pic/master/js/batch_copy.sh"
FILE_LIST_URL="https://raw.githubusercontent.com/andlove/pic/master/js/file_list.txt"

# Download files
curl -O $BATCH_COPY_URL
curl -O $FILE_LIST_URL

# Ensure script has execution permissions
chmod +x batch_copy.sh

# Convert file_list.txt to Unix format
dos2unix file_list.txt

# Execute script
./batch_copy.sh
