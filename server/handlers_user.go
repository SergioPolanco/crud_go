package main

import (
	"github.com/asaskevich/govalidator"
	"github.com/google/uuid"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"golang.org/x/crypto/bcrypt"
)

func handleListUsers(c echo.Context) error {
	var profiles []Profile
	db.Find(&profiles)
	return c.JSON(200, &profiles)
}

func handleGetUser(c echo.Context) error {
	userID := c.Param("userID")
	var profile Profile
	db.Select([]string{
		"user_id",
		"first_name",
		"last_name",
		"email",
		"phone",
		"is_admin",
		"user_name",
	}).Where(&Profile{UserID: userID}).First(&profile)
	if profile.UserID == "" {
		return echo.NewHTTPError(404)
	}
	return c.JSON(200, profile)
}

func handleCreateUser(c echo.Context) error {
	var profile Profile

	if err := c.Bind(&profile); err != nil {
		log.Error(err)
		return echo.NewHTTPError(400)
	}

	_, err := govalidator.ValidateStruct(profile)
	if err != nil {
		err := govalidator.ErrorsByField(err)
		return echo.NewHTTPError(400, err)
	}
	profile.UserID = uuid.New().String()

	passwordHashed, err := bcrypt.GenerateFromPassword([]byte(profile.Password), bcrypt.DefaultCost)

	if err != nil {
		return echo.NewHTTPError(400, "Error to save user")
	}

	profile.Password = string(passwordHashed)
	r := db.Create(&profile)

	if r.Error != nil {
		return echo.NewHTTPError(400, r.Error)
	}

	return c.JSON(201, profile)
}

func handleUpdateUser(c echo.Context) error {
	var newData User

	if err := c.Bind(&newData); err != nil {
		log.Error(err)
		return echo.NewHTTPError(400)
	}

	_, err := govalidator.ValidateStruct(newData)
	if err != nil {
		err := govalidator.ErrorsByField(err)
		return echo.NewHTTPError(400, err)
	}

	var profile Profile
	userID := c.Param("userID")

	db.Where("user_id = ?", userID).First(&profile)
	profile.FirstName = newData.FirstName
	profile.LastName = newData.LastName
	profile.Email = newData.Email
	profile.Phone = newData.Phone

	r := db.Save(&profile)

	if r.Error != nil {
		return echo.NewHTTPError(400, r.Error)
	}

	return c.JSON(200, profile)

}

func handleUserAuthenticate(c echo.Context) error {
	var count int
	var profile Profile
	username := c.QueryParam("username")
	password := c.QueryParam("password")

	db.Where("user_name = ?", username).First(&profile).Count(&count)
	if count == 0 {
		return echo.NewHTTPError(400, "This user doesn't exists")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(profile.Password), []byte(password)); err != nil {
		return echo.NewHTTPError(400, "The password is incorrect")
	}

	profile.Password = ""
	return c.JSON(200, profile)
}
