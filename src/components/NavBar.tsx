import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#F8F8FF', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#A9A9A9', cursor: 'default' }}> 
            <AddCircleIcon />
            <Typography variant="button" sx={{ ml: 1 }}>Cadastro</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#A9A9A9', cursor: 'default' }}>  
            <ArrowDownwardIcon />
            <Typography variant="button" sx={{ ml: 1 }}>Contas a Pagar</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#A9A9A9', cursor: 'default' }}> 
            <ArrowUpwardIcon />
            <Typography variant="button" sx={{ ml: 1 }}>Contas a Receber</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#A9A9A9', cursor: 'default' }}>
            <BarChartIcon />
            <Typography variant="button" sx={{ ml: 1 }}>Relatórios</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon sx={{ color: '#A9A9A9' }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountCircleIcon fontSize="medium" sx={{ color: '#A9A9A9' }} />
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#A9A9A9', fontSize: '0.9rem' }}>
              Admin
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
