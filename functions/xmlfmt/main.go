package main

import (
	"context"
	"github.com/go-xmlfmt/xmlfmt"
	"github.com/tomedharris/transmogrify-app/golib"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// reqp is the request payload of the incoming request.
	reqp, err := golib.TmogRequestPayloadFromString(request.Body)

	if err != nil {
		log.Fatalf("could not decode request - %s", err)
	}

	// TODO Need a better solution than xmlfmt
	//  Doesn't handle CDATA.

	formatted := xmlfmt.FormatXML(reqp.Content, "", "  ", true)
	formatted = strings.TrimPrefix(formatted, "\n")

	// resp is the response payload of the response.
	resp := golib.NewTmogResponsePayload(formatted)
	body, err := resp.Marshal()

	if err != nil {
		log.Fatalf("could not marshal response - %s", err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "application/json"},
		Body:            body,
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
