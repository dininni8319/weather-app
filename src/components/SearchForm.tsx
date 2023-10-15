import { useContext } from 'react'
import classes from './SearchForm.module.css'
import searchSVG from './assets/search.svg'
import termometerSVG from './assets/termometer.svg'
import { ThemeContext } from '../Context/ThemeContext'


type Props = {
  city: string,
  setCity: (city: string) => void
}

const SearchForm = ({ city, setCity }: Props) => {
  const theme = useContext(ThemeContext)

  return (
    <form className={classes.form}>
      <div className={theme?.isDarkMode ? "bg-[#1B1B1D] rounded-md" : "bg-transparent"}>
          <div className={classes["form-input"]}>
            <img src={termometerSVG} alt="" />
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search a location" 
              className={classes.input}
            />
            <img src={searchSVG} alt="" className='pe-2'/>
          </div>
      </div>
    </form>
  )
}

export default SearchForm