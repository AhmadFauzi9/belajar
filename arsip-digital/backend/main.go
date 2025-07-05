package main

import (
	"backend/config"
	"backend/models"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Koneksi database
	config.ConnectDB()

	// Migrasi model
	models := []interface{}{
		&models.User{},
	}
	config.DB.AutoMigrate(models...)

	// Routing
	routes.RegisterRoutes(r)

	// Jalankan server di port 8083
	r.Run(":8083")
}

// func main() {
// 	// Inisialisasi router
// 	r := gin.Default()

// 	// Route uji coba
// 	r.GET("/ping", func(c *gin.Context) {
// 		c.JSON(200, gin.H{
// 			"message": "pong",
// 		})
// 	})

// 	// Jalankan server di port 8083
// 	r.Run(":8083")
// }
