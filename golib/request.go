package golib

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
)

type TmogRequestPayload struct {
	Content string `json:"content"`
}

func TmogRequestPayloadFromString(str string) (TmogRequestPayload, error) {
	var reqp TmogRequestPayload
	err := json.NewDecoder(strings.NewReader(str)).Decode(&reqp)

	if err != nil {
		return reqp, fmt.Errorf("could not decode request - %s", err)
	}

	content, err := base64.StdEncoding.DecodeString(reqp.Content)

	if err != nil {
		return reqp, fmt.Errorf("could not decode request - %s", err)
	}

	reqp.Content = string(content)

	return reqp, nil
}
