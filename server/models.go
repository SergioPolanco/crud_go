package main

// User represent a user model
type User struct {
	UserID    string `gorm:"PRIMARY_KEY" json:"userId"`
	UserName  string `gorm:"unique;not null" json:"userName" valid:"required~Username is required"`
	FirstName string `gorm:"not null" json:"firstName" valid:"required~First Name is required"`
	LastName  string `gorm:"not null" json:"lastName" valid:"required~Last Name is required"`
	Email     string `gorm:"unique;not null" json:"email" valid:"email, required~Email is required"`
	Password  string `gorm:"not null" json:"password" valid:"required~Password is required"`
	Phone     string `json:"phone"`
	IsAdmin   bool   `gorm:"not null" gorm:"default:'false'" json:"isAdmin"`
}
