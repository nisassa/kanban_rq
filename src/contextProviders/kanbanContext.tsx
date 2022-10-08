import { useColumns } from "../hooks/useKanban";
import { useTasks } from "../hooks/useTasks";
import React, { FC, useContext, createContext, Context } from "react";
import {ColumnType, TaskType} from "../types/kanban.interface";
import { useUpdateTask } from "../hooks/useTasks";

interface IKanbanContext {
    columns: ColumnType[] | null;
    columnsLoaded: boolean;
    tasks: TaskType[] | null;
    tasksLoaded: boolean;
    updateTask: (id: TaskType|undefined) => void;
}

export const KanbanContext = createContext<IKanbanContext>(
    {
        columns: null,
        columnsLoaded: false,
        tasks: null,
        tasksLoaded: false,
        updateTask: () => {}
    }
) as Context<IKanbanContext>;


export const useKanban = () => useContext(KanbanContext);


const KanbanProvider: FC<any> = ({ children }) => {
    const {
        data: columns,
        isFetching: isFetchingColumns,
        isLoading: isLoadingColumns,
        refetch: refetchColumns
    } = useColumns();

    const {
        data: tasks,
        isFetching: isFetchingTasks,
        isLoading : isLoadingTasks,
        refetch: refetchTasks
    } = useTasks();

    const updateTask = (task: TaskType| undefined) => {
        const id = task?.id ?? 0
        // const { mutateAsync: updateTask, isLoading } = useUpdateTask(id);
        // console.log("context update task")
        // console.log(task)
    }

    return (
        <KanbanContext.Provider
            value={{
                columns: columns,
                columnsLoaded: !isFetchingColumns && !isLoadingColumns,
                tasks: tasks,
                tasksLoaded: !isFetchingTasks && !isLoadingTasks,
                updateTask,
            }}
        >
            {children}
        </KanbanContext.Provider>
    );
};

export default KanbanProvider;
