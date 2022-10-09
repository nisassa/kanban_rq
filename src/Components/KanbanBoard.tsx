import { useKanban } from "../contextProviders/kanbanContext";
import { Container, SimpleGrid } from '@chakra-ui/react';
import Column from './column';
import React, {useCallback, useState} from 'react';
import {TaskType, ColumnType} from "../types/kanban.interface";

export const KanbanBoard = () => {

    const kanban = useKanban()

    const [columns, setColumns] = useState<ColumnType[] | null>(null);
    const [allTasks, setAllTasks] = useState<TaskType[] | null>(null);

    if (kanban.columnsLoaded && columns === null) {
        const {columns} = kanban
        setColumns(columns)
    }

    if (kanban.tasksLoaded && allTasks === null) {
        const {tasks} = kanban
        setAllTasks(tasks)
    }

    const dropTaskFromColumn = useCallback((fromColumnID: number, toColumnID: number, taskId: TaskType['id']) => {
        if (allTasks) {
            const movingTask = allTasks.find((task) => task.id === taskId);
            if (movingTask) {
                const newTasks = allTasks.map((el) => {
                    return el.id === movingTask.id ? { ...el, column_id: toColumnID }: el
                });
                setAllTasks(newTasks)
            }
        }
    }, [allTasks]);

    const getColumnTasks = (column: number) => {
        return allTasks && allTasks.map((task, key) => {
            if (task.column_id === column) {
                return task
            }
        })
    }

    return (
        <Container maxWidth="container.lg" px={4} py={10}>
            <SimpleGrid
                columns={{ base: 1, md: 4 }}
                spacing={{ base: 16, md: 4 }}
            >
            {
                columns && columns.map((column) => (
                    <Column column={column} key={column.id} tasks={getColumnTasks(column.id)} onDropFromColumn={dropTaskFromColumn}/>
                ))
            }
            </SimpleGrid>
        </Container>
    )
}