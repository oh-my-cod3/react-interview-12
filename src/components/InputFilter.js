

const InputFilter = (props) => {

    return <input 
                type="text" 
                name={props.name}
                className="form-control" 
                value={props.value} 
                onChange={props.handleFilterChange}/>
    
}

export default InputFilter;