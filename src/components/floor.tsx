import React, { useState } from 'react';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import DraggableTable from '../components/draggableTable.tsx';
import { makeStyles } from '@material-ui/core/styles';

interface Table {
  id: string;
  shape: 'rectangle' | 'circle';
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}

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

const Floor = () => {
  const classes = useStyles();
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
    }]);
  };

  const selectedTable = tables.find((table) => table.id === selectedTableId);

  return (
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
            // onRotate={handleRotate}
          />
        ))}
        <button onClick={() => addTable('rectangle', 'T-01')}>Add Rectangle Table</button>
        <button onClick={() => addTable('circle', 'T-01')}>Add Circle Table</button>
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
  );
};

export default Floor;
