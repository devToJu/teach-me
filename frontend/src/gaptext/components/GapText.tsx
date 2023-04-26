import {GapTextModel} from "../models/GapTextModel";

type Props = {
    gapText: GapTextModel
}

export default function GapText(props: Props) {
    const {gapText} = props;

    return (
        <>
            {
                gapText.isGap ?
                    <input value={gapText.value}/> :
                    <label>{gapText.value}</label>
            }
        </>
    )
}