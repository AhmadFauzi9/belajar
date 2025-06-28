#!/bin/bash
cd /var/www/html/public

# Tarik dulu update dari GitHub
echo "[INFO] Menjalankan git pull..."
git pull origin main --rebase

# Tambahkan dan commit file
echo "[INFO] Menambahkan dan commit file..."
git add .
git commit -m "Update otomatis $(date '+%Y-%m-%d %H:%M:%S')"

# Push ke GitHub
echo "[INFO] Push ke GitHub..."
git push origin main
