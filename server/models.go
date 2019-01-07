package main

// User represent a user model
type User struct {
	UserName  string `gorm:"unique;not null" json:"userName" valid:"required~Username is required"`
	FirstName string `gorm:"not null" json:"firstName" valid:"required~First Name is required"`
	LastName  string `gorm:"not null" json:"lastName" valid:"required~Last Name is required"`
	Email     string `gorm:"unique;not null" json:"email" valid:"email, required~Email is required"`
	Phone     string `json:"phone"`
}

//Profile represent a profile model
type Profile struct {
	UserID string `gorm:"PRIMARY_KEY" json:"userId"`
	User
	IsAdmin  bool   `gorm:"not null" gorm:"default:'false'" json:"isAdmin"`
	Password string `gorm:"not null" json:"password" valid:"required~Password is required"`
}

//TableName rename table profile to user
func (Profile) TableName() string {
	return "users"
}
