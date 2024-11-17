import React, { useState } from 'react';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import DraggableTable from '../components/draggableTable.tsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Switch, TextField, Typography } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Stack } from '@mui/material';
import { Table } from '../types/tables.ts';
import DataStore from '../store/dataStore.tsx';

// interface Table {
//     id: string;
//     shape: 'rectangle' | 'circle';
//     label: string;
//     left: number;
//     top: number;
//     width: number;
//     height: number;
//     rotation: number;
// }

const useStyles = makeStyles((theme) => ({
    floor: {
        width: '100%',
        height: '80vh',
        border: '1px dashed #ddd',
        position: 'relative',
    },
    details: {
        padding: theme.spacing(2),
        border: '1px solid #ddd',

        borderRadius: '4px',
        marginBottom: theme.spacing(2),
    },
    label: {
        display: 'block',
        marginBottom: theme.spacing(1),
    },
    input: {
        marginBottom: theme.spacing(2),
        width: '100%',
    },
}));

const Floor = ({value}) => {
    // let passRoom = value;
    // console.log(passRoom);

    const classes = useStyles();
    const [room, setRoom] = useState("main");

    const [tables, setTables] = useState<Table[]>([]);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    const { setNodeRef } = useDroppable({
        id: 'floor',
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === active.id
                    ? { ...table, left: table.left + delta.x, top: table.top + delta.y }
                    : table
            )
        );
    };

    const handleDelete = (id: string) => {
        setTables((prevTables) => prevTables.filter((table) => table.id !== id));
    };

    const handleDuplicate = (id: string) => {
        const tableToDuplicate = tables.find((table) => table.id === id);
        if (tableToDuplicate) {
            setTables((prevTables) => [
                ...prevTables,
                {
                    ...tableToDuplicate,
                    id: `${tableToDuplicate.id}_copy`,
                    left: tableToDuplicate.left + 20,
                    top: tableToDuplicate.top + 20,
                },
            ]);
        }
    };

    const handleSelect = (id: string) => {
        setSelectedTableId(id);
    };

    const handleRotate = (id: string) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === id ? { ...table, rotation: table.rotation + 45 } : table
            )
        );
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === selectedTableId
                    ? { ...table, [name]: value }
                    : table
            )
        );
    };

    const saveRoom = () => {
        console.log(tables);
        const saveRoommm = DataStore.setRoomData(value);
        // const myFloorTables = DataStore.getRoomData(value);
        console.log(saveRoommm);
    }

    const testRoom =() =>{
        const myFloorTables = DataStore.getRoomData(value);
        console.log(myFloorTables)
    }

    const addTable = (shape: 'rectangle' | 'circle', label: string) => {
        setTables([...tables, {
            id: `table_${Date.now()}`,
            shape,
            label,
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            rotation: 0,
            room: value
        }]);
    };

    const selectedTable = tables.find((table) => table.id === selectedTableId);

    return (

        <>
            <div className='floor-side-panal'>
                <Paper style={{ marginTop: 10 }} >
                    {/* <Paper className={classes.sidebar}> */}
                    <Typography variant="h6">Table Options</Typography>
                    <button onClick={() => addTable('rectangle', 'T-01')}>Add Rectangle Table</button>
                    <button onClick={() => addTable('circle', 'T-01')}>Add Circle Table</button>

                </Paper>

                <Paper style={{ marginTop: 20 }} >
                    <Typography variant="h6">Table Details</Typography>
                    <TextField id="outlined-basic" label="name" variant="outlined" size='small' />

                    <div className='flex-direction-colu'>
                        <IconButton color="secondary" aria-label="add an alarm">
                            <AddCircleIcon />
                        </IconButton>
                        <Typography variant="body2">1</Typography>
                        <IconButton color="secondary" aria-label="add an alarm">
                            <AddCircleIcon />
                        </IconButton>
                    </div>

                    <div className='flex-direction-colu'>
                        <IconButton color="secondary" aria-label="add an alarm">
                            <AddCircleIcon />
                        </IconButton>
                        <Typography variant="body2">1</Typography>
                        <IconButton color="secondary" aria-label="add an alarm">
                            <AddCircleIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Switch defaultChecked size="small" />
                    </div>


                    {/* <button onClick={() => addTable('rectangle', 'T-01')}>Add Rectangle Table</button>
                    <button onClick={() => addTable('circle', 'T-01')}>Add Circle Table</button> */}

                </Paper>
            </div>


            <button onClick={saveRoom}>Save</button>
            <button onClick={testRoom}>test</button>
            <DndContext onDragEnd={handleDragEnd}>
                <div ref={setNodeRef} className={classes.floor}>
                    {tables.map((table) => (
                        <DraggableTable
                            key={table.id}
                            id={table.id}
                            shape={table.shape}
                            label={table.label}
                            left={table.left}
                            top={table.top}
                            width={table.width}
                            height={table.height}
                            rotation={table.rotation}
                            onDelete={handleDelete}
                            onDuplicate={handleDuplicate}
                            onSelect={handleSelect}

                        />
                    ))}
                    <h1>{value}</h1>
                    {/* <button onClick={() => addTable('rectangle', 'T-01')}>Add Rectangle Table</button>
                    <button onClick={() => addTable('circle', 'T-01')}>Add Circle Table</button> */}

                </div>
                {selectedTable && (
                    <div className={classes.details}>
                        <label className={classes.label}>Table Name</label>
                        <input
                            className={classes.input}
                            name="label"
                            value={selectedTable.label}
                            onChange={handleTableChange}
                        />
                        <label className={classes.label}>Width</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="width"
                            value={selectedTable.width}
                            onChange={handleTableChange}
                        />
                        <label className={classes.label}>Height</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="height"
                            value={selectedTable.height}
                            onChange={handleTableChange}
                        />
                        <label className={classes.label}>Rotation</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="rotation"
                            value={selectedTable.rotation}
                            onChange={handleTableChange}
                        />
                    </div>
                )}

            </DndContext>
        </>


    );
};

export default Floor;
