import { useColumns } from "../hooks/useKanban";
import { useTasks } from "../hooks/useTasks";
import React, { FC, useContext, createContext, Context } from "react";
import { ColumnType, TaskType } from "../types/kanban.interface";

interface IKanbanContext {
    columns: ColumnType[] | null;
    columnsLoaded: boolean;
    tasks: TaskType[] | null;
    tasksLoaded: boolean;
}

export const KanbanContext = createContext<IKanbanContext>(
    {
        columns: null,
        columnsLoaded: false,
        tasks: null,
        tasksLoaded: false
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

    return (
        <KanbanContext.Provider
            value={{
                columns: columns,
                columnsLoaded: !isFetchingColumns && !isLoadingColumns,
                tasks: tasks,
                tasksLoaded: !isFetchingTasks && !isLoadingTasks,
            }}
        >
            {children}
        </KanbanContext.Provider>
    );
};

export default KanbanProvider;
