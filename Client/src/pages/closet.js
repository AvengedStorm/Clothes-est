import React from "react";
import clothes from "../components/clothes/clothes";
import { DataGrid } from '@material-ui/data-grid';

const rows = clothes;

const columns = [
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
    },
    {
        field: 'picture',
        headerName: 'Picture',
        width: 300,
        renderCell: (params) => (<img src={params.value} alt=""/>)
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
                />
                </div>
            </div>
    )
}

export default Closet;