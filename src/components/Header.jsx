import {BsSearch} from "react-icons/bs"
import {GoPlus} from 'react-icons/go'
import './header.css'
import Search from './Search'

const Header = (props) => {
  
  return (
    <div className='header'>
        <div id="user">Users</div>

        <div id='search'>
          <div className="search"><BsSearch/></div>
          <div className="searchInput"><Search client={props.client}/></div>
        </div>
        
        <div id='newUser'>
            <GoPlus/> New User
        </div>
    </div>
  )
}

export default Header
