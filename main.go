package main

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func main() {
    app := echo.New()
    app.GET("/", HomeHandler)
    app.Logger.Fatal(app.Start(":4000"))
}

func Render(ctx echo.Context, statusCord int, t templ.Component) error {
    ctx.Response().Writer.WriteHeader(statusCode)
    ctx.Response().Header().Set(echo.HeaderContentType, echo.MIMETextHTML)
    return t.Render(ctx.Request().Context(), ctx.Response().Writer)
}

func HomeHandler(c echo.Context) error {
    return Render(c, http.StatusOK, Home())
}

