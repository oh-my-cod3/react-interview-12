

const InputFilter = (props) => {

    return <input 
                type="text" 
                name={props.name}
                className="form-control" 
                value={props.filters[props.name]} 
                onChange={props.handleFilterChange}/>
    
}

export default InputFilter;