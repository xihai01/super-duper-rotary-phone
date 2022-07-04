import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export function Repository() {
  const { name } = useParams();
  // use state goes here
  const [commits, setCommits] = useState<any[]>([]);

  // use efffect goes here
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const { data } = await axios.get(
          `https://api.github.com/repos/silverorange/${name}/commits`
        );
        setCommits(data);
      } catch (error) {
        setCommits([]);
      }
    };
    fetchCommits();
  }, [name]);

  return (
    <div>
      <h1>Most Recent Commit</h1>
      <ul>
        <li>
          {commits.length === 0 ? 'Loading' : commits[0].commit.author.name}
        </li>
        <li>
          {commits.length === 0 ? 'Loading' : commits[0].commit.author.date}
        </li>
        <li>{commits.length === 0 ? 'Loading' : commits[0].commit.message}</li>
      </ul>
      <Link to="/">Back Home</Link>
    </div>
  );
}
