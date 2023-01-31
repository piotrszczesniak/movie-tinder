import { DataContextProvider } from './components/DataContextProvider';
import MovieCard from './components/MovieCard';

function App() {
  return (
    <div className='App'>
      <DataContextProvider>
        <MovieCard />
      </DataContextProvider>
    </div>
  );
}

export default App;
