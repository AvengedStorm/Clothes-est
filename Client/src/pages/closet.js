import React, {useState} from "react";
import clothes from "../components/clothes/clothes";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

const itemTemplate = (data, layout) => {
    if (layout === 'list') {
        return (
            {data}
        );
    }
    if (layout === 'grid') {
        return (
            {data}
        );
    }
}

const Closet = (props) => {
    return(
        <div className="closetDiv">
            <DataView value={clothes} layout="grid" itemTemplate={itemTemplate}></DataView>
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