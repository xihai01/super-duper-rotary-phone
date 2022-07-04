import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Home() {
  // use state goes here
  const [repo, setRepo] = useState<any[]>([]);
  const [listOfRepo, setListOfRepo] = useState<any[]>([]);
  const [filter, setFilter] = useState<{ filterBy: string }>({
    filterBy: 'All',
  });

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
                <li>{data.created_at}</li>
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

  useEffect(() => {
    setListOfRepo(showListOfRepo(filter));
  }, [filter, showListOfRepo]);

  return (
    <div>
      <button onClick={() => handleClick('All')}>All</button>
      <button onClick={() => handleClick('PHP')}>PHP</button>
      <button onClick={() => handleClick('TypeScript')}>TypeScript</button>
      <button onClick={() => handleClick('English')}>English</button>
      <button onClick={() => handleClick('French')}>French</button>
      <section> {repo.length === 0 ? 'Loading' : listOfRepo} </section>
    </div>
  );
}
