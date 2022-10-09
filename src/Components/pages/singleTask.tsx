import {
    Box,
    Center,
    Text,
    Stack,
    Badge,
} from '@chakra-ui/react';
import React from 'react';
import { useSingleTask } from "../../hooks/useTasks";
import { useLocation } from 'react-router'
import { useKanban } from "../../contextProviders/kanbanContext";

export const SingleTask = () => {

    const location = useLocation()
    const path = location.pathname.split('/')[2]

    const { data: task, isLoading, isFetching, refetch } = useSingleTask(parseInt(path));

    // Not sure how to create associations on json server yet => I'm sorry about this!
    const kanban = useKanban()
    const { columns } = kanban
    const column = task && columns && columns.find((column) => column.id === task.column_id);

    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bgGradient="linear(to-l, #fefcbf, #ec9211)"
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
            >
                <Stack pt={10} align={'center'}>
                    { column &&
                    <Badge
                        px={2}
                        py={1}
                        rounded="lg"
                        colorScheme={column.color}
                    >
                        {column.name}
                    </Badge>
                    }

                    <Text fontWeight={800} fontSize={'xl'}>
                        { task?.title }
                    </Text>
                </Stack>
            </Box>
        </Center>
    )
}