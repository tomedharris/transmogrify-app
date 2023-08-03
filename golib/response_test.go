package golib

import "testing"

func TestNewTmogResponsePayload(t *testing.T) {
	p := NewTmogResponsePayload("Hello world!")
	// Ensure the Content is Base64 encoded.
	expected := "SGVsbG8gd29ybGQh"
	if p.Content != expected {
		t.Errorf("expected %s got %s", expected, p.Content)
	}
}

func TestTmogResponsePayload_Marshal(t *testing.T) {
	p := TmogResponsePayload{
		Content: "SGVsbG8gd29ybGQh",
	}
	res, err := p.Marshal()
	if err != nil {
		t.Errorf("could not marshal payload - %s", err)
	}
	// Ensure the content is encoded into a JSON data object.
	expected := `{"content":"SGVsbG8gd29ybGQh"}`
	if res != expected {
		t.Errorf("expected %s got %s", expected, res)
	}
}
