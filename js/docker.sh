#!/bin/bash

# 更新系统包索引
echo "正在更新系统包索引..."
sudo apt-get update -y

# 安装必要的依赖
echo "正在安装必要的依赖..."
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker 的官方 GPG 密钥
echo "正在添加 Docker 的 GPG 密钥..."
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 设置 Docker 的 APT 软件源
echo "正在设置 Docker 的 APT 软件源..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新 APT 软件源索引
echo "正在更新 APT 软件源索引..."
sudo apt-get update -y

# 安装 Docker
echo "正在安装 Docker..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动并设置 Docker 为开机自启动
echo "启动 Docker 服务并设置为开机自启动..."
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
sudo systemctl start docker

# 验证 Docker 安装
echo "验证 Docker 是否安装成功..."
sudo docker --version

echo "Docker 安装完成！"
