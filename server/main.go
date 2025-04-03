package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		// PING routes, currently doubling as simple test routes
		se.Router.GET("/ping/{name}", func(e *core.RequestEvent) error {
			name := e.Request.PathValue("name")
			return e.JSON(http.StatusOK, map[string]any{"name": name})
		})

		se.Router.POST("/ping/{name}", func(e *core.RequestEvent) error {
			name := e.Request.PathValue("name")
			return e.JSON(http.StatusOK, map[string]any{"name": name})
		})

		// user registration flow

		app.OnRecordAfterCreateSuccess("users").BindFunc(func(e *core.RecordEvent) error {
			// e.App
			// e.Record

			fmt.Print(e.Record.Get("id"))
			fmt.Print("uuu")
			collection, err := app.FindCollectionByNameOrId("user_settings")

			fmt.Print("XX")
			if err != nil {
				fmt.Print(err)
				return err
			}
			fmt.Print("OO")
			record := core.NewRecord(collection)

			record.Set("user_id", e.Record.Get("id"))
			record.Set("language", "en")
			record.Set("dark_mode", "dark")

			fmt.Print(record)

			err = app.Save(record)
			if err != nil {
				fmt.Print(err)
				return err
			}

			return e.Next()
		})

		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
