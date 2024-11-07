import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

interface DraggableTableProps {
  id: string;
  shape: 'rectangle' | 'circle';
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSelect: (id: string) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    cursor: 'grab',
    transition: 'transform 0.2s',
  },
  controls: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const DraggableTable: React.FC<DraggableTableProps> = ({
  id,
  shape,
  label,
  left,
  top,
  width,
  height,
  rotation,
  onDelete,
  onDuplicate,
  onSelect,
}) => {
  const classes = useStyles();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    left,
    top,
    width,
    height,
    transform: `translate3d(${transform ? transform.x : 0}px, ${transform ? transform.y : 0}px, 0) rotate(${rotation}deg)`,
    borderRadius: shape === 'circle' ? '50%' : '0',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={classes.table}
      onClick={() => onSelect(id)}
    >
      {label}
      <div className={classes.controls}>
        <IconButton size="small" onClick={() => onDuplicate(id)}>
          <FileCopyIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        {/* <IconButton size="small" onClick={() => onRotate(id)}>
          <RotateLeftIcon fontSize="small" />
        </IconButton> */}
      </div>
    </div>
  );
};

export default DraggableTable;
