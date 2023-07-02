import React from 'react'
import { useGlobalContext } from './context'

const Search = () => {
  const {query,searchPost} =useGlobalContext();
  return (
    < >
      <h1> Technical News Websites</h1>
      <form onSubmit={(e)=>e.preventDefault()}>
        <div>
          <input type='text' placeholder='Search here' value={query} onChange={(e)=>searchPost(e.target.value)}></input>
        </div>
      </form>
    </>
  )
}

export default Search