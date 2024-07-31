#!/bin/bash

# 定义文件的GitHub原始链接
BATCH_COPY_URL="https://raw.githubusercontent.com/andlove/pic/master/js/batch_copy.sh"
FILE_LIST_URL="https://raw.githubusercontent.com/andlove/pic/master/js/file_list.txt"

# 下载文件
curl -O $BATCH_COPY_URL
curl -O $FILE_LIST_URL

# 确保脚本具有执行权限
chmod +x batch_copy.sh

# 执行脚本
./batch_copy.sh
