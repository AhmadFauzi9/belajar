package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string `gorm:"type:varchar(100)" json:"name"`
	Email    string `gorm:"type:varchar(100);unique" json:"email"`
	Role     string `gorm:"type:varchar(50)" json:"role"`
	Password string `json:"-"`
}



	