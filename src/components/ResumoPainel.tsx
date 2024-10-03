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
        color: cor,
        borderRadius: 4,
        border: `2px solid ${cor}`,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#A9A9A9', mb: 1 }}>
          {titulo}
        </Typography>
        {React.cloneElement(icone as React.ReactElement, { fontSize: "medium", sx: { position: 'absolute', top: '16px', right: '16px' } })}
      </Box>
      <Typography variant="h5" sx={{ color: 'black', mt: 2, textAlign: 'left' }}>
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}
      </Typography>  
    </Paper>
  );
};

export default ResumoPainel;
