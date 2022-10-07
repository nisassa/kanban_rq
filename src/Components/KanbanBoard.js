import { useKanban } from "../provider/kanbanContext";

export const KanbanBoard = () => {
    const kanban = useKanban()

    console.log('columns')
    console.log(kanban?.columns?.data)

    return <h1>Hello!</h1>
}