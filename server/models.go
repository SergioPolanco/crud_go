package main

// User represent a user model
type User struct {
	FirstName string `json:"firstName" validate:"required"`
	LastName  string `json:"lastName" validate:"required"`
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`
	Phone     string `json:"phone"`
	IsAdmin   bool   `json:"isAdmin"`
}