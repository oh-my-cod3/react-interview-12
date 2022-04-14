import axios from "axios";
import { useEffect, useState } from "react";
import {URLS, FILTERS} from "../utils/Constants"
import InputFilter from "./InputFilter";
import PlanetModal from "./PlanetModal";

const PeopleTable = () => {

    const [filters, setFilters] = useState(FILTERS)
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [planetDetails, setPlanetDetails] = useState(null);

    useEffect(() => {

        axios.get(URLS.people).then(res => {

            setPeople(res.data.results)
            setLoading(false)
        })

        return () => {}
    }, [])

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
                    <th>Name</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Created</th>
                    <th>Edited</th>
                    <th>Planet</th>
                </tr><tr>
                    <th><InputFilter name="name" handleFilterChange={handleFilterChange} filters={filters} /></th>
                    <th><InputFilter name="height" handleFilterChange={handleFilterChange} filters={filters} /></th>
                    <th><InputFilter name="mass" handleFilterChange={handleFilterChange} filters={filters} /></th>
                    <th><InputFilter name="created" handleFilterChange={handleFilterChange} filters={filters} /></th>
                    <th><InputFilter name="edited" handleFilterChange={handleFilterChange} filters={filters} /></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {people.filter((person, index) => {

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
        </table>
        {isOpen && <PlanetModal setIsOpen={setIsOpen} planetDetails={planetDetails} />}
    </>
    
}

export default PeopleTable;