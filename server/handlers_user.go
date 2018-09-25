package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

func handleCreateUser(c echo.Context) error {
	var user User
	if err := c.Bind(&user); err != nil {
		log.Error(err)
		return echo.NewHTTPError(400)
	}
	insForm, errDB := db.Prepare("INSERT INTO user(first_name, last_name, email, password, phone, is_admin) VALUES(?,?,?,?,?,?)")
	if errDB != nil {
		panic(errDB.Error())
	}
	insForm.Exec(&user)
	return c.JSON(201, user)
}
