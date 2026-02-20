#!/bin/bash
set -euo pipefail

echo "正在更新系统包索引…"
sudo apt-get update

echo "正在安装必要依赖（ca-certificates、curl、gnupg、lsb-release）…"
sudo apt-get install -y ca-certificates curl gnupg lsb-release

echo "正在创建 keyrings 目录…"
sudo install -m 0755 -d /etc/apt/keyrings

echo "正在添加 Docker 官方 GPG 公钥（ASCII 格式 *.asc）…"
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

ARCH="$(dpkg --print-architecture)"
UBUNTU_CODENAME="$(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")"
echo "检测到架构：$ARCH，发行代号：$UBUNTU_CODENAME"

echo "正在设置 Docker 的 APT 软件源…"
echo "deb [arch=${ARCH} signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${UBUNTU_CODENAME} stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "正在更新软件源索引…"
sudo apt-get update

echo "正在安装 Docker Engine、CLI、containerd、buildx、docker-compose 插件…"
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "启动 Docker 服务并设为开机自启…"
sudo systemctl enable --now docker.service
sudo systemctl enable containerd.service || true

echo "把 ubuntu 加入 docker 组（可选，但推荐）…"
sudo usermod -aG docker ubuntu || true
echo "提示：重新登录 SSH 后，ubuntu 才能免 sudo 使用 docker。"

echo "验证 Docker 安装…"
sudo docker --version
sudo docker compose version

echo "推荐进一步验证："
echo "  sudo docker run --rm hello-world"

echo "安装完成 🎉"
