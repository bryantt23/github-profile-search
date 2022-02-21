import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

const pageStates = { input: 'input', output: 'output', loading: 'loading' };

function App() {
  const [profile, setProfile] = useState('bryantt23');
  const [pageState, setPageState] = useState(pageStates.input);

  const getMyProfile = async profile => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${profile}`
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    alert(`The name you entered was: ${profile}`);
    setPageState(pageStates.loading);
    const res = await getMyProfile(profile);
    console.log('🚀 ~ file: App.js ~ line 21 ~ handleSubmit ~ res', res);
    setPageState(pageStates.output);
  };

  return (
    <div className='App'>
      {JSON.stringify(pageState)}
      {pageState === pageStates.input ? (
        <div>
          <p>{profile}</p>

          <form onSubmit={handleSubmit}>
            <label>
              Enter your name:
              <input
                type='text'
                onChange={e => setProfile(e.target.value)}
                value={profile}
              />
            </label>
            <input type='submit' />
          </form>
        </div>
      ) : pageState === pageStates.loading ? (
        <div>Loading...</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
