import {GapTextContainerModel} from "../models/GapTextContainerModel";
import GapText from "./GapText";

type Props = {
    gapText: GapTextContainerModel
}

export default function GapTextContainer(props: Props) {
    const {gapText} = props

    return (
        <>
            <p>{gapText.description}</p>
            <div style={{backgroundColor: "green"}}>
                {
                    gapText.gapTexts.map(
                        (gapText, index) =>
                            <GapText
                                key={index}
                                gapText={gapText}
                            />
                    )
                }
            </div>
        </>
    )
}