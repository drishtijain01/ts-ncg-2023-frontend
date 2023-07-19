import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
    const [inputataValue, setinputataValue] = useState("");
    const [currentData, setCurrentData] = useState([]);
    const [currentIndicator,setIndicator] = useState([]);
    const [inputIndicatorValue, setinputIndicatorValue] = useState("");

  const handleDataChange = (event) => {
    setinputataValue(event.target.value);
    fetch("https://api.worldbank.org/v2/country/?format=json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const list = data[1].filter((eachData)=>{
          return eachData.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setCurrentData(list);
        console.log(list);
      });
  };
  const handleIndicatorChange = (event) => {
    setinputIndicatorValue(event.target.value);
    fetch("https://api.worldbank.org/v2/indicator?format=json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const list = data[1].filter((eachData)=>{
          return eachData.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setCurrentData(list);
        console.log(list);
      });
  }

  const handleSearch = () =>{
    const ISOCode = inputataValue;
    const indicator = inputIndicatorValue;
    const startDate = document.getElementById("startYear").value;
    const endYear = document.getElementById("endYear").value;
    fetch("https://api.worldbank.org/v2/country/" + ISOCode +"/indicator/"+ indicator +"?date=" + startDate +":"+ endYear +"&format=json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("see console");
      });
  }

  const handleSave = () =>{
    
  }

  return (
    <div className="App">
    <div style={{display: "flex",flexDirection: "column"}}>
    <div>
    <label>Enter ISO code:</label>
      <input type="text" value={inputataValue} onChange={handleDataChange} onBlur={()=>{setCurrentData([])}}/>
      </div>
      <div>
      <label>Enter Indicator Data:</label>
      <input type = "text" value={inputIndicatorValue} onChange={handleIndicatorChange} onBlur={()=>{setIndicator([])}}/>
      </div>
      <div>
      <label>Enter start year:</label>
      <input type="number" id="startYear" placeholder="YYYY"/>
      </div>
      <div>
      <label>Enter end year:</label>
      <input type="number" id="endYear" placeholder="YYYY"/>
      </div>
      </div>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleSave}>Save</button>
      {currentData.map((eachData) =>{
        return (
          <>
          <p>{eachData.id}</p>
          <p>{eachData.name}</p>
          </>
        )
      })}
      {currentIndicator.map((eachData) =>{
        return <p>{eachData.name}</p>
      })}
    </div>
  );
}

export default App;