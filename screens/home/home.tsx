'use client';
import styles from './home.module.scss'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchAutocomplete from '../../components/autocomplete/autocomplete';
import { DEBOUNCE_TIMEOUT } from '../../utils/config';
import { GitUser } from '../../utils/types';
import { Alert, Snackbar, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { searchUsers } from '../results/service';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<GitUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (searchTerm)
      setLoadingUsers(true);
    else
      setLoadingUsers(false);
    const delaySearch = setTimeout(async () => {
      try {
        if (searchTerm) {
          const response = await searchUsers(searchTerm);
          setUsers(response.items.map((item: any) => ({ username: item.login })))
        }
        else setUsers([])
        setLoadingUsers(false)
      }
      catch (error) {
        setShowErrorMessage(true);
        setUsers([])
        setLoadingUsers(false)
      }
    }, DEBOUNCE_TIMEOUT);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleChangeOnSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleOptionSelect = (option: GitUser) => {
    router.push(`/results?username=${option.username}`)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowErrorMessage(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Github account finder</h1>
          <div className={styles['input-wrapper']}>
            <SearchAutocomplete
              inputValue={searchTerm}
              onChange={handleChangeOnSearch}
              options={users}
              onOptionSelect={handleOptionSelect}
              loading={loadingUsers}
            />
          </div>
        </div>
        <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" className={styles['error-message']}>Something went wrong. Please try again in a few moments!</Alert>
        </Snackbar>
      </main>
    </ThemeProvider>
  )
}
