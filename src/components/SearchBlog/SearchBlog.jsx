import React from "react";
import {useState} from "react";




const SearchBlog = ({handleClick})=>{

	const [searchValue, setSearchValue] = useState("")



	return(

		<div className=" flex gap-3 ml-auto" >
			<input type="text" value = {searchValue} onChange={e=>setSearchValue(e.target.value)} placeholder="Search Blogs" className=" p-2 rounded-md bg-gray-200 h-full outline-none " />
			<button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={_=>{handleClick(searchValue)}}  >Find</button>
			<button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={_=>{
				setSearchValue("")
				handleClick("")
			}}  >Reset</button>
			
		</div>

		)


}



export default SearchBlog;