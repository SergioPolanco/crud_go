package main

import (
	"fmt"

	"github.com/asaskevich/govalidator"
	"github.com/google/uuid"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

func handleListUsers(c echo.Context) error {
	var users []User
	db.Find(&users)
	return c.JSON(200, &users)
}

func handleGetUser(c echo.Context) error {
	userID := c.Param("userID")
	var user User
	db.Select([]string{"user_id", "first_name", "last_name", "email", "phone", "is_admin"}).Where(&User{UserID: userID}).First(&user)
	if user.UserID == "" {
		return echo.NewHTTPError(404)
	}
	return c.JSON(200, user)
}

func handleCreateUser(c echo.Context) error {
	var user User

	if err := c.Bind(&user); err != nil {
		log.Error(err)
		return echo.NewHTTPError(400)
	}

	_, err := govalidator.ValidateStruct(user)
	if err != nil {
		err := govalidator.ErrorsByField(err)
		return echo.NewHTTPError(400, err)
	}
	user.UserID = uuid.New().String()

	r := db.Create(&user)

	if r.Error != nil {
		return echo.NewHTTPError(400, r.Error)
	}

	return c.JSON(201, user)
}

func handleUserAuthenticate(c echo.Context) error {
	var count int
	var user User
	username := c.QueryParam("username")
	password := c.QueryParam("password")

	db.Where("user_name = ? AND password= ?", username, password).First(&user).Count(&count)

	fmt.Println(username)
	if count == 0 {
		return echo.NewHTTPError(400, "Username or Password incorrects")
	}

	return c.JSON(200, user)
}
