package main

import (
	"github.com/jinzhu/gorm"
)

// User represent a user model
type User struct {
	gorm.Model
	UserID    int    `gorm:"primary_key" json:"userId"`
	FirstName string `gorm:"not null" json:"firstName" validate:"required"`
	LastName  string `gorm:"not null" json:"lastName" validate:"required"`
	Email     string `gorm:"not null" json:"email" validate:"required"`
	Password  string `gorm:"not null" json:"password" validate:"required"`
	Phone     string `json:"phone"`
	IsAdmin   bool   `gorm:"not null" json:"isAdmin"`
}
