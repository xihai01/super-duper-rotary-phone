import { useEffect, useState } from 'react';
import axios from 'axios';

export function Home() {
  // use state goes here
  const [repo, setRepo] = useState<any[]>([]);

  // use efffect goes here
  useEffect(() => {
    // fetch repo data
    const fetchRepo = async () => {
      try {
        const { data } = await axios.get('/repos');
        setRepo(data);
      } catch (error) {
        console.log(error); // -> remove from production; replace with server error page
      }
    };
    fetchRepo();
  }, []);
  const listOfRepo = repo.map((data) => {
    return (
      <article key={data.id}>
        <h2>{data.name}</h2>
        <ul>
          <li>{data.created_at}</li>
          <li>{data.description ? data.description : 'no desc'}</li>
          <li>{data.language ? data.language : 'no language'}</li>
          <li>{data.forks_count ? data.forks_count : 'unavilable'}</li>
        </ul>
      </article>
    );
  });
  return <div>{repo.length === 0 ? 'Loading' : listOfRepo}</div>;
}
