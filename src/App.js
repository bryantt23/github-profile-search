import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

const pageStates = { input: 'input', output: 'output', loading: 'loading' };

function App() {
  const [profile, setProfile] = useState('bryantt23');
  const [pageState, setPageState] = useState(pageStates.input);
  const [profileData, setProfileData] = useState(null);
  const [totalStars, setTotalStars] = useState(0);

  const getTotalStars = async profile => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${profile}/repos`
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  };
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
    // alert(`The name you entered was: ${profile}`);
    setPageState(pageStates.loading);
    const res = await getMyProfile(profile);
    setProfileData(res);
    const stars = await getTotalStars(profile);
    let starsTotal = 0;
    for (const star of stars) {
      starsTotal += star.stargazers_count;
    }
    setTotalStars(starsTotal);

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
        <div>
          <p>{JSON.stringify(profileData, null, 4)}</p>
          <img style={{ height: 50 }} src={profileData.avatar_url} />
          <h3>Stars total: {totalStars}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
