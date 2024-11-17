
export type User = {
    id: number;
    name: string;
    email: string;
};

export type Table = {
    id: string;
    shape: 'rectangle' | 'circle';
    label: string;
    left: number;
    top: number;
    width: number;
    height: number;
    rotation: number;
    room: string;
}

export type Room = {
    id: string;
    name: string;
    discription: string;
    tables: Table[];
}