import React, {useState} from "react";
import clothes from "../components/clothes/clothes";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { DataGrid } from '@material-ui/data-grid';


// const itemTemplate = (data, layout) => {
//     if (layout === 'list') {
//         return (
//             {data}
//         );
//     }
//     if (layout === 'grid') {
//         return (
//             {data}
//         );
//     }
// }

const rows = clothes;

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90 
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'number',
        width: 110,
    },
    {
        field: 'size',
        headerName: 'Size:',
        width: 150,
    },
    {
        field: 'style',
        headerName: 'Style',
        width: 150,
    },
    {
        field: 'isWashed',
        headerName: 'Is Washed',
        width: 150,
    }
];

const Closet = (props) => {
    return(
        <div className="closetDiv">
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
            </div>
        </div>
    )
}

export default Closet;

// <div className="dialog1">
//      {(clothes || []).map(clothes => 
//          <div className="clothItem">
//              <article className="clothCard">
//                  <h3 className="clothSize">Size: {clothes.size} | Style: {clothes.style}</h3>
//                  <div className="clothPicture">
//                      {clothes.picture ? <img className="cloth" src={clothes.picture} /> : <></>}
//                      {clothes.isWashed ? <></> : <h3 className="isWashed">You need to wash this cloth.</h3>}
//                  </div>
//              </article>
//          </div>
//      )}
// </div>