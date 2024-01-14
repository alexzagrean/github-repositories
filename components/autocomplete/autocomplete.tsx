import React, { useState, ChangeEvent } from 'react';
import styles from './autocomplete.module.scss'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { GitUser } from '../../utils/types';

interface SearchAutocompleteProps {
    inputValue: string;
    onChange: (value: string) => void;
    options: GitUser[];
    onOptionSelect: (option: GitUser) => void
    loading: boolean
}

const SearchAutocomplete = ({ inputValue, onChange, options, onOptionSelect, loading }: SearchAutocompleteProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<{}>, newInputValue: string) => {
        onChange(newInputValue);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOptionSelect = (event: React.ChangeEvent<{}>, value: GitUser | null) => {
        if (value) {
            onOptionSelect(value);
        }
    };

    return (
        <Autocomplete
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            loading={loading}
            loadingText={
                <div className={styles['autocomplete-message']}>
                    Loading...
                </div>
            }
            getOptionLabel={(option) => option.username}
            onChange={handleOptionSelect}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size='medium'
                    placeholder="Type github username..."
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading && <CircularProgress color="inherit" size={20} />}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.username} className={`${props.className} ${styles.option}`}>
                    {option.username}
                </li>
            )}
            noOptionsText={
                <div className={styles['autocomplete-message']}>
                    No results
                </div>
            }
        />
    );
};

export default SearchAutocomplete;
