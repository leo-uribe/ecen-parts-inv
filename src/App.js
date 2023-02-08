import './App.css';
import {useState } from "react";
import Axios from "axios";
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Box,AppBar, Toolbar, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//import {makeStyles} from "@material-ui/core/styles";
//import MaterialTable from 'material-table';

import SearchBar from "material-ui-search-bar";
//import PartList from "./components/partlist"


function App() {
  //declaring variables and hooks
  //Table elements
  const[Id, setId]= useState(0);
  const[PartID,setPartID]=useState("");
  const[MountingType,setMount]=useState("");
  const[Manufacturer, setManufacturer]= useState("");
  const[Price, setPrice]= useState("");
  const[Vendor, setVendor]= useState("");
  const[ProductClass, setProduct]= useState("");
  const[BinAssignment, setBin]= useState("");
  //Table list
  const[partList, setPartList] =useState([]);
  //search bar 
  const [rows, setRows] = useState(partList);
  const [searched, setSearched] = useState("");
  //dropdown
  const [filtertype, setFilter]=useState("");
  const columns=[
    {title:"Part ID",field:"name"},
    {title:"Mounting Type",field:"MountingType"},
    {title:"Manufacturer",field:"Manufacturer"},
    {title:"Price",field:"Price"},
    {title:"Vendor",field:"Vendor"},
    {title:"Product Class",field:"ProductClass"},
    {title:"Bin ssignment",field:"BinAssignment"},
  ]


  // Table search functions for filtering
  const requestSearch = (searchedVal) => {
    const filteredRows = partList.filter((row) => {
      return row.PartID.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const requestmountSearch = (searchedVal) => {
    const filteredRows = partList.filter((row) => {
      return row.MountingType.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const requestManufacturerSearch = (searchedVal) => {
    const filteredRows = partList.filter((row) => {
      return row.Manufacturer.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const vendorSearch = (searchedVal) => {
    const filteredRows = partList.filter((row) => {
      return row.Vendor.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const BinSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      //console.log(row.BinAssignment)
      return (row.BinAssignment === (searchedVal));
    });
    setRows(filteredRows);
  };

  const deletefilter = (searchedVal)=> {
    const filteredRows = rows.filter((row) => {
      //console.log(row.BinAssignment)
      return (row.ID !== (searchedVal));
    });
    setRows(filteredRows);
  }

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  // Back end API functions 
  const addPart =() =>{
    if(PartID ===""){
      alert("ERROR: please fill out all text inputs")
    }else{
    Axios.post('http://localhost:3001/create',{
      PartID:PartID,
      MountingType:MountingType,
      Manufacturer:Manufacturer,
      Price:Price,
      Vendor:Vendor,
      ProductClass:ProductClass,
      BinAssignment:BinAssignment
    }).then(()=>{
        console.log("success");
        alert("Part Added Succesfully, Press 'Show Parts' to refresh")
      });
    }
  };
  const getParts = () =>{
    Axios.get('http://localhost:3001/parts').then((response) =>{
        
        setPartList(response.data);
        setRows(response.data);
      });
  };
  
  const deletePart =(Id) =>{
    if(Id === 0){
      console.log("stoped empty delete")
    }else{
      Axios.delete('http://localhost:3001/delete/'+ Id).then(()=>{
        console.log("success");
        deletefilter(Id);
      });
    }
  };
  return (
    <div className="App">

      <div class="header">
        <title>Electronic Parts Inventory</title>
        <img class="tamulogo" id="howdy-mobileheaderRight" 
        src="https://cdn.eis.tamu.edu/public/images/TAM-Primary-white.png" alt="HeaderRight TAMU Logo"></img>

      </div>

      <h2>Manually Add Part</h2>
      <div className='addpart'>
        <label> PartID: </label>
        <input 
         type="text"
         onChange={(event)=>{
          setPartID(event.target.value);
         }} />

        <label> MountingType: </label>
        <input 
        type="text"
        onChange={(event)=>{
         setMount(event.target.value);
        }} 
        />

        <label> Manufacturer: </label>
        <input
        type="text"
        onChange={(event)=>{
         setManufacturer(event.target.value);
        }} />

        <label> Price: </label>
        <input
        type="text"
        onChange={(event)=>{
         setPrice(event.target.value);
        }} />

        <label> Vendor: </label>
        <input
        type="text"
        onChange={(event)=>{
         setVendor(event.target.value);
        }} />

        <label> Product Class: </label>
        <input
        type="text"
        onChange={(event)=>{
         setProduct(event.target.value);
        }} />

        <label> Bin Assignment: </label>
          <input
          type="number"
          onChange={(event)=>{
          setBin(event.target.value);
        }} />

        <button className='button' onClick={addPart}> Add Part</button>
      </div>
        <h2>Sort Table by Bin </h2>
      <div className="bins">
      <button class='button' onClick={() => BinSearch(1)}>Bin 1</button>
      <button class='button' onClick={() => BinSearch(2)}>Bin 2</button>
      <button class='button' onClick={() => BinSearch(3)}>Bin 3</button>
      <button class='button' onClick={() => BinSearch(4)}>Bin 4</button>
      <button class='button' onClick={() => BinSearch(5)}>Bin 5</button>
      <button class='button' onClick={() => BinSearch(6)}>Bin 6</button>
      <button class='button' onClick={() => BinSearch(7)}>Bin 7</button>
      <button class='button' onClick={() => BinSearch(8)}>Bin 8</button>
      </div>

        <h2>Database Inventory</h2>

      <div className='parts'>

      </div>

      <div className ="parts">
        <button class="button" onClick={getParts}>Show parts</button> 
        <Paper>
        <Box >
          <AppBar position='static' color = "inherit">
            <Toolbar >            
            <Box sx={{flexGrow:1}}>
              <SearchBar
                placeholder = "Part ID Search"
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                sx={{mr:2}}
              />
            </Box>
            <Box sx={{flexGrow:1}}>
            <SearchBar
                placeholder="Mount Type Search"
                value={searched}
                onChange={(searchVal) => requestmountSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                sx={{mr:2}}
              />
            </Box>
            <Box sx={{flexGrow:1}}>
            <SearchBar
                placeholder= "Manufacturer Search"
                value={searched}
                onChange={(searchVal) => requestManufacturerSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                sx={{mr:2}}
              />
            </Box>
            <Box sx={{flexGrow:1}}>
            <SearchBar
                placeholder= "Vendor Search"
                value={searched}
                onChange={(searchVal) => vendorSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                sx={{mr:2}}
              />
            </Box>
            </Toolbar>
          </AppBar>
        </Box>
        
          <TableContainer component={Paper}>
            <Table aria-label= 'simple table' >
              <TableHead>
                <TableRow
                sx={{backgroundColor:"rgba(85,0,0)","& th":{color:"white"}}}>
                  <TableCell>Id</TableCell>
                  <TableCell>Part ID</TableCell>
                  <TableCell>Mounting Type</TableCell>
                  <TableCell>Manufacturer</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Product Class</TableCell>
                  <TableCell>Bin Assignment</TableCell>
                  <TableCell> <DeleteIcon></DeleteIcon></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((row) => (
                    <TableRow 
                      key={row.ID} 
                      sx={{ '&:last-child td, &:last-child th':{border:0} }}
                      style={row.ID %2 ?{background: "#ece8e8"}:{background:"white"}}
                      >
                      <TableCell>{row.ID}</TableCell>
                      <TableCell>{row.PartID}</TableCell>
                      <TableCell>{row.MountingType}</TableCell>
                      <TableCell>{row.Manufacturer}</TableCell>
                      <TableCell>{row.Price}</TableCell>
                      <TableCell>{row.Vendor}</TableCell>
                      <TableCell>{row.ProductClass}</TableCell>
                      <TableCell>{row.BinAssignment}</TableCell>
                      <TableCell>
                        <IconButton onClick={()=> deletePart(row.ID)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                        
                      </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>  
      </div>



      
    </div>
  );
}

export default App;
