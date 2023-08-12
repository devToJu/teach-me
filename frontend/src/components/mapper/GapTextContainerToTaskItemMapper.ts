import {GapTextContainerModel} from "../../gaptext/models/GapTextContainerModel";
import {TaskItem} from "../../tasks/common/TaskItem";

export class GapTextContainerToTaskItemMapper {
    map(container: GapTextContainerModel, isSelected: boolean) {
        let text = ""
        container.gapTexts.forEach(gapText => text += gapText.value + " ")

        const taskItem: TaskItem = {
            id: container.id,
            description: container.description,
            text: text,
            isSelected
        }

        return taskItem
    }
}