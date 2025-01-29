package main

import (
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

        return se.Next()
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}