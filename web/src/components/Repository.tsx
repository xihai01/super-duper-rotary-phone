import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import moment from 'moment';

import '../App.css';

export function Repository() {
  const { name } = useParams();
  const [commits, setCommits] = useState<any[]>([]);
  const [readMe, setReadMe] = useState<string>('');

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const { data } = await axios.get(
          `https://api.github.com/repos/silverorange/${name}/commits`
        );
        const readMeData = await axios.get(
          `https://raw.githubusercontent.com/silverorange/${name}/master/README.md`
        );
        setCommits(data);
        setReadMe(readMeData.data);
      } catch (error) {
        setCommits([]);
        setReadMe('');
      }
    };
    fetchCommits();
  }, [name]);

  return (
    <div className="repository">
      <h1>Most Recent Commit</h1>
      <ul>
        <li>
          {commits.length === 0
            ? 'No name available'
            : `Author: ${commits[0].commit.author.name}`}
        </li>
        <li>
          {commits.length === 0
            ? 'No author available'
            : `Date: ${moment(commits[0].commit.author.date)}`}
        </li>
        <li>
          {commits.length === 0
            ? 'No commit message available'
            : `Message: ${commits[0].commit.message}`}
        </li>
      </ul>
      <br />
      <h1>README.md</h1>
      <section>
        {readMe.length === 0 ? (
          'No README.md available'
        ) : (
          <ReactMarkdown>{readMe}</ReactMarkdown>
        )}
      </section>
      <Link to="/">Back Home</Link>
    </div>
  );
}
