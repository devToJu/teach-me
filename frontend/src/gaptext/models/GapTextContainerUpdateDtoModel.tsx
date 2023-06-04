import {GapTextContainerCreateDtoModel} from "./GapTextContainerCreateDtoModel";
import {GapTextModel} from "./GapTextModel";

export class GapTextContainerUpdateDtoModel extends GapTextContainerCreateDtoModel {
    id: string

    constructor(description: string, gapTexts: GapTextModel[], creator: string, id: string) {
        super(description, gapTexts, creator);
        this.id = id;
    }
}