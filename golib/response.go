package golib

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
)

type TmogResponsePayload struct {
	Content string `json:"content"`
}

func NewTmogResponsePayload(content string) *TmogResponsePayload {
	return &TmogResponsePayload{
		Content: base64.StdEncoding.EncodeToString([]byte(content)),
	}
}

func (p *TmogResponsePayload) Marshal() (string, error) {
	result, err := json.Marshal(p)

	if err != nil {
		return "", fmt.Errorf("could not marshal json - %s", err)
	}

	return string(result), nil
}
