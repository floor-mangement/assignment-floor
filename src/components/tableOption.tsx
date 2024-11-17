import * as React from 'react';
import { useState } from 'react';
import { Table } from '../types/tables';

const TableOption = () =>{
    
    const [tables, setTables] = useState<Table[]>([]);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  
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
            room: 'main',
        }]);
      };

    return(
        <>
        <button onClick={() => addTable('rectangle', 'T-01')}>Add Rectangle Table</button>
        <button onClick={() => addTable('circle', 'T-01')}>Add Circle Table</button>
        
        </>
    )
}

export default TableOption;