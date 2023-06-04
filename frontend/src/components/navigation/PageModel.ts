export type PageModel = {
    url: string,
    name: string
}

export type PageModelGroup = {
    name: string,
    subitems: PageModel[]
}

export const urlGapText : string = "/gaptext"
export const urlGapTextCreate: string = "/gaptext/create"
export const urlLogin: string = "/signin"
export const urlTaskCreate: string = "/task"