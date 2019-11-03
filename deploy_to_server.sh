# 发布react项目到线上服务器

## 前端构建
npm run build
if [ $? -ne 0 ]; then
  echo "build failed" 1>&2
  exit 1
fi

## 压缩打包
tar -czf build.tar.gz ./build
if [ $? -ne 0 ]; then
  echo "tar create failed" 1>&2
  exit 1
fi

## 传输到远程服务器
scp ./build.tar.gz root@calm-welcome:/root/upload/react-wordpress-website

## 远程执行更新脚本
ssh root@calm-welcome "/bin/bash -x /root/upload/react-wordpress-website/deploy.sh"