import React from 'react'

const loginForm = ({ handleSubmit, handleChange, username, password }) => (
    <div>
      <h2>Kirjaudu</h2>
  
      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
)

export default loginForm