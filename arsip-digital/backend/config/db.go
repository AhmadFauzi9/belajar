package config

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// Ganti dengan konfigurasi database MySQL kamu
	dsn := "jipau:J1pauG!ft123@tcp(127.0.0.1:3306)/arsip-digital?charset=utf8mb4&parseTime=True&loc=Local"

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Gagal Koneksi Database: " + err.Error())
	}

	fmt.Println("✅ Koneksi database berhasil!")
}