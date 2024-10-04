import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
// eslint-disable-next-line 
export default function FullWidthTextField({ placeholder, onSearch }) {
    return (
        <Box sx={{ width: 900, maxWidth: '100%', margin: '20px 0' }}>
            <TextField fullWidth id="fullWidth" placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon sx={{ cursor: 'pointer' }} />
                        </InputAdornment>
                    ),
                },
            }
            } />
        </Box>
    )
};