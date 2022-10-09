import {
    Badge,
    Box,
    Heading,
    IconButton,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { ColumnType, TaskType } from "../types/kanban.interface";
import React from "react";

import { AddIcon } from '@chakra-ui/icons';
import Task from './task';
import { useColumnDrop } from "../hooks/useDragAndDrop";
import { useCreateTask } from "../hooks/useKanban";
import { useKanban } from "../contextProviders/kanbanContext";

function Column({
    column,
    tasks,
    onDropFromColumn
}: {
    column: ColumnType,
    tasks: (TaskType | undefined)[] | null,
    onDropFromColumn: (fromColumnID: number, toColumnID: number, taskId: TaskType['id']) => void,
}) {
    const kanban = useKanban();

    const { mutateAsync: createTask, isLoading: isCreating } = useCreateTask();

    const createNewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!isCreating) {
            const newTasks = createTask({
                column_id: column.id,
                title: "New",
            })
            kanban.updateRequireTaskRefetch(true)
        }
    }

    const { dropRef, isOver } = useColumnDrop(column, onDropFromColumn);

    const Tasks = tasks && tasks.map((task, index) => {
        if (task) {
            return (
                <Task
                    key={task.id}
                    task={task}
                    index={index}
                />
            )
        }
    });

    return (
        <Box>
            <Heading fontSize="md" mb={4} letterSpacing="wide">
                <Badge
                    px={2}
                    py={1}
                    rounded="lg"
                    colorScheme={column.color}
                >
                    {column.name}
                </Badge>
            </Heading>
            <IconButton
                size="xs"
                w="full"
                color={useColorModeValue('gray.500', 'gray.400')}
                bgColor={useColorModeValue('gray.100', 'gray.700')}
                _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
                py={2}
                variant="solid"
                onClick={createNewTask}
                colorScheme="black"
                aria-label="add-task"
                icon={<AddIcon />}
            />
            <Stack
                ref={dropRef}
                direction={{ base: 'row', md: 'column' }}
                h={{ base: 300, md: 600 }}
                p={4}
                mt={2}
                spacing={4}
                bgColor={useColorModeValue('gray.50', 'gray.900')}
                rounded="lg"
                boxShadow="md"
                overflow="auto"
                opacity={isOver ? 0.85 : 1}
            >
                { Tasks }
            </Stack>
        </Box>
    );
}

export default Column;
