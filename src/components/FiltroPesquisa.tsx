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
        width: '95%',
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
                backgroundColor: '#6A0DAD',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1,
                marginRight: 1,
              }}
            >
              <ArrowBackIcon sx={{ color: 'white' }} />
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
                    borderRadius: '4px',
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
              InputProps={{
                style: { 
                  border: '1px solid black', 
                  borderRadius: '4px', 
                  height: '50px',
                  fontSize: '1rem',
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
              InputProps={{
                style: { 
                  border: '1px solid black', 
                  borderRadius: '4px', 
                  height: '50px',
                  fontSize: '1rem',
                },
              }}
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            sx={{ width: '48%', backgroundColor: '#9370DB', color: 'white', fontSize: '0.75rem' }}
            startIcon={<PictureAsPdfIcon />}
          >
            PDF
          </Button>

          <Button
            variant="contained"
            sx={{ width: '48%', fontSize: '0.85rem', backgroundColor: '#8A2BE2', color: 'white' }}
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
