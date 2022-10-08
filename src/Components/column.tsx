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

function Column({
    column,
    tasks,
    onDropFromColumn
}: {
    column: ColumnType,
    tasks: (TaskType | undefined)[] | null,
    onDropFromColumn: (fromColumnID: number, toColumnID: number, taskId: TaskType['id']) => void
}) {

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
                // onClick={}
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
