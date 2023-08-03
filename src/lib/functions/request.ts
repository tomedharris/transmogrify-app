export interface RequestPayload {
    content: string
}

export const makeRequestPayload = (c: string) => {
    return {
        content: btoa(c)
    };
}