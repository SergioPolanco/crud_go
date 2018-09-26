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

	return c.JSON(201, user)
}
