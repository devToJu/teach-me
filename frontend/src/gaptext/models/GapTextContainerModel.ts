import {GapTextContainerCreateDtoModel} from "./GapTextContainerCreateDtoModel";
import {Retrievable} from "../../components/interfaces/Retrievable";
import {GapTextModel} from "./GapTextModel";

export class GapTextContainerModel extends GapTextContainerCreateDtoModel implements Retrievable {
    id: string

    constructor(description: string, gapTexts: GapTextModel[], creator: string, id: string) {
        super(description, gapTexts, creator);
        this.id = id;
    }

    getInfo(): string {
        const gapText = this.gapTexts[0]
        if (gapText === undefined) {
            return "No info found..."
        }

        return gapText.value
    }
}
