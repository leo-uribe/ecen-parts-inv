import { useState, useEffect } from "react";
import axios from "axios";

import {Link} from "react-router-dom";

const PartList =() => {
    const [part, setPart] = useState([]);
    useEffect(()=> {
        getParts();

    },[]);

    const getParts = async () => {
        const response = await axios.get('http://localhost:3001/parts');
        setPart(response)

    }
    return(
        <div>
      <table id="inventory">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Manufacturer</th>
        </tr>
        <tr>
          <td>00001</td>
          <td>Op AMP</td>
          <td>Texas Instrument</td>
        </tr>
        <tr>
          <td>00002</td>
          <td>MOSFET Transistor</td>
          <td>ONSEMI</td>
        </tr>
      </table>
        </div>
    )
}