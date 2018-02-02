import React from 'react'

const AddMember = ({ value, change, submit, value2, change2 }) => {
    return (
      <div>
        <h2>Lisää uusi</h2>
        <form onSubmit={submit}>
            <div>
              nimi: <input 
                      value={value}
                      onChange={change}/><br/>
              numero: <input 
                        value={value2}
                        onChange={change2}/>        
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
      </div>
    )
}

export default AddMember