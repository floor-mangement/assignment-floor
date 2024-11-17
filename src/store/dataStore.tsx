import * as React from 'react';
import {Table , User, Room} from '../types/tables';

const myallRoom = [{id:"main",name:"main",discription:"main test", table:[{height: 100 ,id: "table_1731522660358",label: "T-01",left: 579,room: "main",rotation: 0,shape: "circle",top: 176,width: 100},
    {height: 100,id: "table_1731522666285",label: "T-01",left: 411,room: "main",rotation: 0,shape: "rectangle",top: 340,width: 100 }, 
    ]} ,
    {id:"second",name:"second",discription:"second test",  table:[{height: 100,id: "table_1731522669819",label: "T-01",left: 135,room: "main",rotation: 0,shape: "circle",top: 340,width: 100},
        {height: 100,id: "table_1731522673422",label: "T-01",left: 299,room: "main",rotation: 0,shape: "rectangle",top: 138,width: 100}
        ]},
        {id:"third",name:"third",discription:"third test",  table:[{height: 100,id: "table_1731522669819",label: "T-01",left: 135,room: "main",rotation: 0,shape: "circle",top: 340,width: 100},
            {height: 100,id: "table_1731522673422",label: "T-01",left: 299,room: "main",rotation: 0,shape: "rectangle",top: 138,width: 100}
            ]}]

const DataStore = {

    setRoomData: (value: any) => {
        console.log("in set room data")
        for(let i = 0; i < myallRoom.length; i++ ){
            console.log(i);
            if(myallRoom[i].id == value){
                console.log(myallRoom[i]);
                myallRoom[i].discription = "set new discription";
                console.log(myallRoom[i]);
                return(myallRoom);
            }
            

        };

    },

    getRoomData: (id : string) =>{
        console.log("passId - ",id);

        const myAllTables = [{height: 100 ,id: "table_1731522660358",label: "T-01",left: 579,room: "main",rotation: 0,shape: "circle",top: 176,width: 100},
            {height: 100,id: "table_1731522666285",label: "T-01",left: 411,room: "main",rotation: 0,shape: "rectangle",top: 340,width: 100 }, 
            {height: 100,id: "table_1731522669819",label: "T-01",left: 135,room: "main",rotation: 0,shape: "circle",top: 340,width: 100},
            {height: 100,id: "table_1731522673422",label: "T-01",left: 299,room: "main",rotation: 0,shape: "rectangle",top: 138,width: 100}] 
            
            return(myallRoom);
            
    }


}

export default DataStore;
