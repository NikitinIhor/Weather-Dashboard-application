import { useDispatch, useSelector } from 'react-redux';
import {
  selectCities,
  selectError,
  selectLoading,
  deleteCity,
} from '../../redux/citySlice';
import Loader from '../Loader/Loader';
import css from './CitiesList.module.css';

export default function CitiesList() {
  const dispatch = useDispatch();

  const citiesList = useSelector(selectCities);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (citiesList.length === 0)
    return <p className={css.empty}>Your favorite cities list is empty</p>;

  const handleDelete = cityName => {
    dispatch(deleteCity(cityName));
  };

  return (
    <ul className={css.list}>
      {citiesList.map((el, index) => (
        <li className={css.item} key={index}>
          <div className={css.name}>
            {el.name} ({el.sys.country})
          </div>
          <div>
            Temperature: <span>{el.main.temp}°C</span>
          </div>
          <div>
            Humidity: <span>{el.main.humidity}%</span>{' '}
          </div>
          <div>
            Wind Speed: <span>{el.wind.speed}m/s</span>{' '}
          </div>
          <button
            onClick={() => handleDelete(el.name)}
            className={css.btn}
            type="button"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
