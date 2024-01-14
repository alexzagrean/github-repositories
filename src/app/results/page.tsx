'use client';
import styles from './page.module.scss'
import { getRepositories } from './service';
import RepositoriesList from '../../../components/list/repositoriesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from '@mui/material';
import { Repository, UserDetails } from '../../../utils/types';
import { REPO_LIST_PAGE_SIZE } from '../../../utils/config';

export default function Results() {
  const searchParams = useSearchParams()
  const [repositories, setRepositories] = useState<Repository[] | null>(null)
  const [user, setUser] = useState<UserDetails | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const username = searchParams.get('username')
      if (username) {
        const data = await getRepositories(username)
        if (data && data.length > 0) {
          setRepositories(data.map((element: any) => ({
            name: element.name,
            stars: element.stargazers_count,
            forks: element.forks_count,
            url: element.html_url
          })))
          setUser({
            photo: data[0].owner.avatar_url,
            url: data[0].owner.html_url,
            name: data[0].owner.login,
            repo_count: data.length,
          })
        } else {
          setRepositories([])
        }
      }
    }
    fetchData()
  }, [])


  return (
    <div className={styles.main}>
      <div className={styles['back-button']}>
        <Link href='/' className='back-button'>
          <ArrowBackIcon />
          <p>Go back</p>
        </Link>
      </div>
      {user || (repositories && repositories.length > 0) ?
        <div className={styles.content}>
          <div className={styles.userWrapper}>
            {user &&
              <div className={styles.user}>
                <div className={styles['image-wrapper']}>
                  <img src={user.photo} alt="Profile picture" />
                </div>
                <div className={styles['user-details']}>
                  <div className={styles.name}>{user.name}</div>
                  <Link className={styles['github-link']} href={user.url} target="_blank">
                    <LaunchIcon></LaunchIcon>
                    See github page
                  </Link>
                </div>
              </div>}
          </div>
          <div className={styles.repoWrapper}>
            {repositories && repositories.length > 0 &&
              <div>
                <div className={styles.header}>
                  <h2>Repositories</h2>
                  {user && user.repo_count ?
                    <div className={styles['repo-count']}>{user?.repo_count}</div> : <></>}
                </div>
                <RepositoriesList data={repositories} pageSize={REPO_LIST_PAGE_SIZE} />
              </div>
            }
          </div>
        </div> :
        repositories === null ?
          <div className={styles['spinner-wrapper']}>
            <CircularProgress />
          </div>
          :
          <div className={styles['spinner-wrapper']}>
            <h2>
              No repositories found
            </h2>
          </div>
      }
    </div>
  )
}
