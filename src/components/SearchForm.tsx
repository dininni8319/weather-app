import classes from './SearchForm.module.css'
import searchSVG from './assets/search.svg'
import termometerSVG from './assets/termometer.svg'

type Props = {
  city: string,
  setCity: (city: string) => void
}

const SearchForm = ({ city, setCity }: Props) => {
  return (
    <form className={classes.form}>
      <div className={classes["form-input"]}>
        <img src={termometerSVG} alt="" />
        <input 
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search a location" 
          className={classes.input}
        />
        <img src={searchSVG} alt="" />
      </div>
    </form>
  )
}

export default SearchForm