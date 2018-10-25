package main

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func dbConn() *gorm.DB {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "root"
	dbName := "crud_go"
	db, err := gorm.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName+"?charset=utf8&parseTime=True&loc=Local")
	// defer db.Close()
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&User{})
	return db
}

var db = dbConn()
