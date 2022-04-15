import axios from "axios";
import { useEffect, useState } from "react";
import {URLS, FILTERS} from "../utils/Constants"
import InputFilter from "./InputFilter";
import PlanetModal from "./PlanetModal";


/**
 * A differenza del componente PeopleTable, questo gestisce la paginazione
 * sfortunatamente la ricerca lato API viene fatta con un solo campo, quindi 
 * risulta scomodo filtrare i dati per colonna.
 * 
 * Volendo filtrare per colonna si dovrebbe fare il mix dei due componenti:
 * un loop con cui si scaricano tutte le pagine ([...data, response.results])
 * e poi filtrare sull'array in locale, come nel componenente PeopleTable
 */

const PeopleTableFull = () => {

    const [filters, setFilters] = useState(FILTERS)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [planetDetails, setPlanetDetails] = useState(null);
    const [url, setUrl] = useState(URLS.people);
    

    useEffect(() => {

        console.log(url)

        axios.get(url).then(res => {
            setData(res.data);
            setLoading(false);
        })

        return () => {}
    }, [url])

    const handleFilterChange = (e) => {
        setFilters((oldFilters) => {
            return {...oldFilters, [e.target.name]: e.target.value}
        })
    }

    const handleShowPlanet = (planet) => {
        console.log(planet)

        axios.get(planet).then(res => {

            setPlanetDetails(res.data)
            setIsOpen(true)
        })
    }

    if(loading){
        return <h1>loading data...</h1>
    }

    return <>
            <table className="table table-stripped table-hover">
            <thead>
                <tr>
                    {Object.keys(filters).map((key, index) => {
                        return <th key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                    })}
                </tr>
                <tr>
                    {Object.keys(filters).map((key, index) => {
                        return <th key={index}><InputFilter name={key} handleFilterChange={handleFilterChange} value={filters[key]} /></th>
                    })}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.results.filter((person, index) => {

                    return Object.keys(filters).every(filter => {
                        return person[filter].toLowerCase().includes(filters[filter]);
                    })

                }).map((person, index) => {
                    return <tr key={index}>
                        <td>{person.name}</td>
                        <td>{person.height}</td>
                        <td>{person.mass}</td>
                        <td>{person.created}</td>
                        <td>{person.edited}</td>
                        <td><button onClick={() => handleShowPlanet(person.homeworld)} className="btn btn-sm btn-primary">Planet</button></td>
                    </tr>
                })}
            </tbody>
            <tfoot>
                <tr>
                    {/* Gestione paginazione */}
                    <td colSpan={3} style={{textAlign: "left"}}>
                        {data.previous && <button className="btn btn-sm btn-warning" onClick={() => setUrl(data.previous)}>PREV</button>}
                    </td>
                    <td colSpan={3} style={{textAlign: "right"}}>
                        {data.next && <button className="btn btn-sm btn-warning" onClick={() => {setUrl(data.next)}}>NEXT</button>}
                    </td>
                </tr>                
            </tfoot>
        </table>

        {/* Modal per dettagio pianeta */}
        {isOpen && <PlanetModal setIsOpen={setIsOpen} planetDetails={planetDetails} />}
    </>
    
}

export default PeopleTableFull;