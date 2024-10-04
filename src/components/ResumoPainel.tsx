import { Paper, Typography, Box } from '@mui/material';
import React from 'react';

interface ResumoPainelProps {
  titulo: string;
  valor: number;
  cor: string;
  icone: React.ReactNode;
}

const ResumoPainel: React.FC<ResumoPainelProps> = ({ titulo, valor, cor, icone }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333333', mb: 1 }}>
          {titulo}
        </Typography>
        {React.cloneElement(icone as React.ReactElement, { 
          fontSize: "medium", 
          sx: { position: 'absolute', top: '16px', right: '16px', color: cor } 
        })}
      </Box>
      <Typography variant="h5" sx={{ color: 'black', mt: 2, textAlign: 'left' }}>
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}
      </Typography>  

      <Box sx={{
        height: '10px',
        backgroundColor: cor,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '0 0 20px 20px',
      }} />
    </Paper>
  );
};

export default ResumoPainel;
