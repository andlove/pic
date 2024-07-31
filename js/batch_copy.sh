#!/bin/bash

# Define source and target directories
SOURCE_DIR="/mnt/alist/115/gfriends"
TARGET_DIR="/home/emby/metadata/people"

# Read the file name list
while IFS= read -r name
do
    # Create target directory
    mkdir -p "$TARGET_DIR/$name"

    # Copy and rename the file
    cp "$SOURCE_DIR/$name.jpg" "$TARGET_DIR/$name/folder.jpg"
done < "$(dirname "$0")/file_list.txt"
