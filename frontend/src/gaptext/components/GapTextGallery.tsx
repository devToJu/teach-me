import {useContext} from "react";
import {ApiFunctionsContext} from "../contexts/ApiFunctionsContext";
import GapTextContainer from "./GapTextContainer";

export default function GapTextGallery() {
    const {getAllGapTexts} = useContext(ApiFunctionsContext)

    return (
        <>
            {
                getAllGapTexts().map(
                    gapText =>
                        <GapTextContainer
                            key={gapText.id}
                            gapText={gapText}
                        />
                )
            }
        </>
    )
}