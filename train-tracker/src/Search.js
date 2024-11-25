import './styles/Search.css';
import {useState} from 'react'

import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { getLocalCache } from './LocalCache';


function Search({searchFun, routes, stations, setSelectedStation, selectedStation, selectedRoute, setSelectedRoute}){
    const [selectedNumber, setSelectedNumber] = useState("");
    const [upcoming, setUpcoming] = useState(false);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [favoriteOptions, addToFavList] = useState(populateFavDrop)

    function handleNumber(e){ setSelectedNumber(e.target.value); }
    function handleRoute(e){ setSelectedRoute(e.target.value); }
    function handleStation(e){ setSelectedStation(e.target.value)}
    function handleUpcoming(e){ setUpcoming(e.target.checked); }
    function handleFromStation(e){ setFromStation(e.target.value); }
    function handleToStation(e){ setToStation(e.target.value); }
    
    function handleFavoriteSelection(e){
        addToFavList(populateFavDrop())
        e.preventDefault();
        searchFun("", e.target.value, "", "", "", "")
    }

    function populateFavDrop(){
        let favNames = ["---"]
        const cachedTrains = getLocalCache()
        Object.keys(cachedTrains.data).forEach(trainName => {
            favNames.push(trainName)
        });
        const mapping = favNames.map((element, index) => <option value={element} key={index}>{element}</option>)
        return mapping
    }

    

    const search = (event) =>{
        event.preventDefault();
        searchFun(selectedNumber, selectedRoute, selectedStation, upcoming, fromStation, toStation);
    }

    const clearSearch = () => {
        setSelectedNumber("");
        setSelectedRoute("");
        setSelectedStation("");
        setUpcoming(false);
        setFromStation("");
        setToStation("");
    }

    return (
        <form className='form' onSubmit={search}>
                <div className='top-label'>
                    Search options: 
                </div>
                <span className="select-label">
                        Train Number:
                        <input className="select-box" value={selectedNumber} onChange={handleNumber} type="number" min='1'></input>
                    </span>
                <span className="select-label">
                        Route:
                        <select className="select-box" value={selectedRoute} onChange={handleRoute} children={routes}></select>
                    </span>
                <span className="select-label">By station: </span>
                    <select className='select-box' value={selectedStation} onChange={handleStation} children={stations}></select>
                    <span className="select-label">
                        Upcoming trains only: 
                        <input checked={upcoming} onChange={handleUpcoming} type="checkbox" ></input>
                    </span>
               
                <label className="optional-criteria-label">
                    Optional criteria:
                    <span className="select-label">
                        From:
                        <select className="select-box" value={fromStation} onChange={handleFromStation} children={stations}></select>
                    </span>
                    <span className="select-label">
                        To:
                        <select className="select-box" value={toStation} onChange={handleToStation} children={stations}></select>
                    </span>
                </label>

                <label className="favorites-dropdown-selection">
                Favorites:
                    <span className="select-box">
                    <select className="favorites-dropdown" onClick={handleFavoriteSelection}>{favoriteOptions}</select>
                    </span>
                </label>

                <span className='button-container'>
                    <div onClick={search} className='form-button'>Search <IoSearch/></div>
                    <div onClick={clearSearch} className='form-button'>Clear <MdClear/></div>
                </span>
              </form>
    );
    
}

export default Search;