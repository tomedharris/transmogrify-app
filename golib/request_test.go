package golib

import "testing"

func TestTmogRequestPayloadFromString(t *testing.T) {
	p, _ := TmogRequestPayloadFromString(`{"content": "SGVsbG8gd29ybGQh"}`)
	expected := "Hello world!"
	if p.Content != expected {
		t.Errorf("expected %s got %s", expected, p.Content)
	}
}
