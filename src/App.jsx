import CitiesList from './components/CitiesList/CitiesList';
import SearchCity from './components/SearchCity/SearchCity';

export default function App() {
  return (
    <div className="container">
      <SearchCity />
      <CitiesList />
    </div>
  );
}
