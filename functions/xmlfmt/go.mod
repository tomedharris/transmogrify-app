module github.com/tomedharris/transmogify-app/functions/xmlfmt

go 1.19

require (
	github.com/aws/aws-lambda-go v1.38.0
	github.com/go-xmlfmt/xmlfmt v1.1.2
	github.com/tomedharris/transmogrify-app/golib v1.0.0
	github.com/yosssi/gohtml v0.0.0-20201013000340-ee4748c638f4
)

require golang.org/x/net v0.13.0 // indirect

replace github.com/tomedharris/transmogrify-app/golib => ../../golib
