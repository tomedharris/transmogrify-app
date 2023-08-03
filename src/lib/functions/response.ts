export interface ResponsePayload {
    content: string
}

export const getResponseContent = (r: ResponsePayload): string => atob(r.content)
