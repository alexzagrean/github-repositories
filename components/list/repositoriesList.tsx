import styles from './repositoriesList.module.scss'
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import Link from 'next/link';
import { Repository } from '../../utils/types';
import { useState } from 'react';

interface RepositoriesListProps {
    data: Repository[]
    pageSize: number
}

export default function RepositoriesList({ data, pageSize }: RepositoriesListProps) {
    const [page, setPage] = useState(1);

    const handleClickOnMore = () => {
        setPage((prevState) => prevState + 1);
    }

    return (
        <div className={styles.table}>
            {data.slice(0, page * pageSize).map(row => (
                <Link href={row.url} className={styles['card-wrapper']} target='_blank' key={row.name}>
                    <div className={styles.card}>
                        <div className={styles.name}>{row.name}</div>
                        <div className={styles.stars}>
                            <StarIcon className={styles.icon} />
                            {row.stars + ' '}
                            stars
                        </div>
                        <div className={styles.forks}>
                            <CallSplitIcon className={styles.icon} />
                            {row.forks + ' '}
                            forks
                        </div>
                    </div>
                </Link>
            ))
            }
            {data.length > page * pageSize &&
                <div className={styles['load-more-button-wrapper']} onClick={handleClickOnMore}>
                    <div className={styles['load-more-button']}>
                        Load more
                    </div>
                </div>}
        </div >
    )
}
