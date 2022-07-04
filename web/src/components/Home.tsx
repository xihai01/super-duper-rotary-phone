import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import '../App.css';

export function Home() {
  const [repo, setRepo] = useState<any[]>([]);
  const [listOfRepo, setListOfRepo] = useState<any[]>([]);
  const [filter, setFilter] = useState<{ filterBy: string }>({
    filterBy: 'All',
  });

  const navigate = useNavigate();

  // handle repo list filtering by language
  const handleClick = (filterWord: string) => {
    setFilter({ filterBy: filterWord });
  };

  const showListOfRepo = useCallback(
    (filterObj: { filterBy: string }) => {
      const { filterBy } = filterObj;
      const repositories: any[] = [];
      repo.forEach((data) => {
        if (data.language === filterBy || filterBy === 'All') {
          repositories.push(
            <article key={data.id}>
              <Link to={`/repo/${data.name}`}>
                <h2>{data.name}</h2>
              </Link>
              <ul>
                <li>{`${moment(data.created_at)}`}</li>
                <li>{data.description ? data.description : 'no desc'}</li>
                <li>{data.language ? data.language : 'no language'}</li>
                <li>{data.forks_count ? data.forks_count : 'unavilable'}</li>
              </ul>
            </article>
          );
        }
      });
      return repositories;
    },
    [repo]
  );

  useEffect(() => {
    // fetch repo data
    const fetchRepo = async () => {
      try {
        const { data } = await axios.get('/repos');
        setRepo(data);
      } catch (error) {
        navigate('/error');
      }
    };
    fetchRepo();
  }, [navigate]);

  useEffect(() => {
    // store a filter list of repo based on language
    setListOfRepo(showListOfRepo(filter));
  }, [filter, showListOfRepo]);

  return (
    <div className="home">
      <button onClick={() => handleClick('All')}>All</button>
      <button onClick={() => handleClick('PHP')}>PHP</button>
      <button onClick={() => handleClick('TypeScript')}>TypeScript</button>
      <button onClick={() => handleClick('English')}>English</button>
      <button onClick={() => handleClick('French')}>French</button>
      <section> {repo.length === 0 ? 'Loading' : listOfRepo} </section>
    </div>
  );
}
