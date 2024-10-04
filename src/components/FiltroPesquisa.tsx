import { Grid, TextField, Button, Paper, Box, Typography } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface FiltroPesquisaProps {
  onPesquisar: (filtros: { centroCusto: string; dataInicio: string; dataFim: string }) => void;
}

const FiltroPesquisa: React.FC<FiltroPesquisaProps> = ({ onPesquisar }) => {
  const [centroCusto, setCentroCusto] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleSubmit = () => {
    if (!dataInicio || !dataFim) {
      alert('Por favor, preencha as datas de início e fim.');
      return;
    }
    onPesquisar({ centroCusto, dataInicio, dataFim });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        border: '1px solid #E0E0E0',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#EAD6FB',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1,
                marginRight: 1,
              }}
            >
              <ArrowBackIcon sx={{ color: '#9370DB' }} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black', mb: 0.5 }}>
                Centro de Custo
              </Typography>
              <TextField
                placeholder="Selecione..."
                fullWidth
                value={centroCusto}
                onChange={(e) => setCentroCusto(e.target.value)}
                InputProps={{
                  style: { 
                    border: '1px solid black', 
                    borderRadius: '7px',
                    height: '50px',
                    fontSize: '1rem',
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black', mb: 0.5 }}>
              Data Inicial
            </Typography>
            <TextField
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  height: '50px',
                  borderRadius: '7px',
                  border: '1px solid black',
                },
              }}
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black', mb: 0.5 }}>
              Data Final
            </Typography>
            <TextField
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  height: '50px',
                  borderRadius: '7px',
                  border: '1px solid black',
                },
              }}
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            sx={{
              width: '40%',
              bottom: '-10px',
              backgroundColor: '#EAD5FF',
              color: 'purple',
              fontSize: '0.75rem',
              transition: 'background-color 0.3s, transform 0.2s',
              '&:hover': {
                backgroundColor: '#D5B6E3',
                transform: 'scale(1.05)',
              },
            }}
            startIcon={<PictureAsPdfIcon />}
          >
            PDF
          </Button>

          <Button
            variant="contained"
            sx={{
              width: '55%',
              bottom: '-10px',
              fontSize: '0.85rem',
              backgroundColor: '#7E5EF2',
              color: 'white',
              transition: 'background-color 0.3s, transform 0.2s',
              '&:hover': {
                backgroundColor: '#6B4BC5',
                transform: 'scale(1.05)',
              },
            }}
            onClick={handleSubmit}
            startIcon={<SearchIcon />}
          >
            Pesquisar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FiltroPesquisa;
