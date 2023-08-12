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
        return (this.gapTexts.length < 1) ?
            "No info found..." :
            this.gapTexts
                .map(gapText => gapText.value)
                .join(" ")
    }

    /**
     * Creates a GapTextContainerModel instance
     * @param container A type of GapTextContainerModel or a JS-object
     * @return a new GapTextContainerModel instance
     */
    static of(container: GapTextContainerModel): GapTextContainerModel {
        return new GapTextContainerModel(
            container.description,
            container.gapTexts,
            container.creator,
            container.id)
    }
}
