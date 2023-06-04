import {GapTextModel} from "./GapTextModel";

export class GapTextContainerCreateDtoModel {
    description: string
    gapTexts: GapTextModel[]
    creator: string

    constructor(description: string, gapTexts: GapTextModel[], creator: string) {
        this.description = description;
        this.gapTexts = gapTexts;
        this.creator = creator;
    }
}