import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCityData } from '../../redux/citiesOPS';
import css from './SearchCity.module.css';

export default function SearchCity() {
  const [city, setCity] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => {
    setCity(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (city.trim() !== '') {
      dispatch(getCityData(city.toLowerCase()));
      setCity('');
    } else {
      alert(`Please enter the city name`);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>- Search City -</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          value={city}
          onChange={handleChange}
          type="text"
          name="text"
          placeholder="city..."
        />
        <button className={css.btn}>Search</button>
      </form>
    </div>
  );
}
