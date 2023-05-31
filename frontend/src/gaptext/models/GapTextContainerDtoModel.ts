import {GapTextModel} from "./GapTextModel";

export type GapTextContainerDtoModel = {
    description: string,
    gapTexts: GapTextModel[],
    creator: string
}