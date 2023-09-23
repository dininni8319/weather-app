import classes from './SearchForm.module.css'

type Props = {
  city: string,
  setCity: (city: string) => void
}

const SearchForm = ({ city, setCity}: Props) => {
  return (
    <form className={classes.form}>
      <input 
        type="text" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search" 
        className={classes.input}
      />
    </form>
  )
}

export default SearchForm