package main

import (
	"fmt"

	"github.com/asaskevich/govalidator"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

func handleListUsers(c echo.Context) error {
	var users []User
	db.Find(&users)
	return c.JSON(200, &users)
}

func handleCreateUser(c echo.Context) error {
	var user User

	if err := c.Bind(&user); err != nil {
		log.Error(err)
		return echo.NewHTTPError(400)
	}

	result, err := govalidator.ValidateStruct(user)
	if err != nil {
		err := govalidator.ErrorsByField(err)
		return echo.NewHTTPError(400, err)
	}
	fmt.Println(result)
	db.Create(&user)

	return c.JSON(201, user)
}
