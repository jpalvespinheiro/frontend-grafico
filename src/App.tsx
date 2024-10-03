import { Container, Box, Grid, Button, Typography, Paper } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import ResumoPainel from './components/ResumoPainel';
import FiltroPesquisa from './components/FiltroPesquisa';
import Navbar from './components/NavBar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [currentChart, setCurrentChart] = useState<'LINE' | 'BAR'>('LINE');
  const [totalReceitas, setTotalReceitas] = useState<number>(0);
  const [totalDespesas, setTotalDespesas] = useState<number>(0);
  const [lucroLiquido, setLucroLiquido] = useState<number>(0);
  const [contasVencidas, setContasVencidas] = useState<number>(0);
  const [contasAVencer, setContasAVencer] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const parseCurrency = (value: string): number => {
    return Number(value.replace(/[^\d,-]/g, '').replace(',', '.'));
  };

  const adaptChartData = (data: any) => {
    return {
      labels: data.labels || [],
      datasets: data.datasets?.map((dataset: any) => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: dataset.hoverBackgroundColor || ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      })) || [],
    };
  };

  const fetchChartData = useCallback((filtros: { dataInicio: string; dataFim: string }, tipo: 'LINE' | 'BAR') => {
    setIsLoading(true);
    axios.get('http://localhost:3000/api/charts', {
      params: { tipo, dataInicio: filtros.dataInicio, dataFim: filtros.dataFim },
    })
      .then(response => {
        setChartData(adaptChartData(response.data));
      })
      .catch(error => {
        console.error(`Erro ao buscar dados do gráfico de ${tipo}:`, error);
      })
      .finally(() => setIsLoading(false));

    axios.get('http://localhost:3000/api/total-receitas', {
      params: { dataInicio: filtros.dataInicio, dataFim: filtros.dataFim },
    })
      .then(response => setTotalReceitas(parseCurrency(response.data.total)))
      .catch(error => console.error('Erro ao buscar total de receitas:', error));

    axios.get('http://localhost:3000/api/total-despesas', {
      params: { dataInicio: filtros.dataInicio, dataFim: filtros.dataFim },
    })
      .then(response => setTotalDespesas(parseCurrency(response.data.total)))
      .catch(error => console.error('Erro ao buscar total de despesas:', error));

    axios.get('http://localhost:3000/api/contas-vencidas', {
      params: { dataInicio: filtros.dataInicio, dataFim: filtros.dataFim },
    })
      .then(response => setContasVencidas(parseCurrency(response.data.total)))
      .catch(error => console.error('Erro ao buscar contas vencidas:', error));

    axios.get('http://localhost:3000/api/contas-a-vencer', {
      params: { dataInicio: filtros.dataInicio, dataFim: filtros.dataFim },
    })
      .then(response => setContasAVencer(parseCurrency(response.data.total)))
      .catch(error => console.error('Erro ao buscar contas a vencer:', error));
  }, []);

  useEffect(() => {
    setLucroLiquido(totalReceitas - totalDespesas);
  }, [totalReceitas, totalDespesas]);

  useEffect(() => {
    fetchChartData({ dataInicio: '2024-09-01', dataFim: '2024-09-07' }, currentChart);
  }, [currentChart, fetchChartData]);

  const handleNextChart = () => {
    setCurrentChart(currentChart === 'LINE' ? 'BAR' : 'LINE');
  };

  const handlePreviousChart = () => {
    setCurrentChart(currentChart === 'BAR' ? 'LINE' : 'BAR');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth={false} disableGutters={true} sx={{ px: 4 }}>
        <Box sx={{ my: 4 }}>
          <FiltroPesquisa onPesquisar={(filtros) => fetchChartData(filtros, currentChart)} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <ResumoPainel 
              titulo="Total Receita" 
              valor={totalReceitas} 
              cor="green" 
              icone={<ArrowUpwardIcon fontSize="large" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <ResumoPainel 
              titulo="Total Despesa" 
              valor={totalDespesas} 
              cor="red" 
              icone={<ArrowDownwardIcon fontSize="large" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <ResumoPainel 
              titulo="Lucro Líquido" 
              valor={lucroLiquido} 
              cor="orange" 
              icone={<ThumbUpIcon fontSize="large" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <ResumoPainel 
              titulo="Contas Vencidas" 
              valor={contasVencidas} 
              cor="lightblue" 
              icone={<AccountBalanceIcon fontSize="large" />} 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <ResumoPainel 
              titulo="Contas a Vencer" 
              valor={contasAVencer} 
              cor="lightblue" 
              icone={<AccountBalanceIcon fontSize="large" />} 
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ my: 4, borderRadius: 2, border: '1px solid #E0E0E0', p: 2, marginTop: '0px', marginBottom: '0px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Gráfico de Resultados</Typography>
                <Button variant="outlined" onClick={handleNextChart}>
                  {currentChart === 'LINE' ? 'Gráfico de Barras' : 'Gráfico de Linhas'}
                </Button>
              </Box>
              {isLoading ? (
                <Typography variant="h6" align="center">Carregando gráfico...</Typography>
              ) : currentChart === 'LINE' ? (
                <LineChart data={chartData} />
              ) : (
                <BarChart data={chartData} />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2, height: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" fontWeight="bold">Nome</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" fontWeight="bold">Despesa</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" fontWeight="bold">Receita</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" fontWeight="bold">Resultado</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body2">SUZANO TRANSPORTE FLORESTAL</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">R$ 53.549,47</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">R$ 41.954,26</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">- R$ 11.595,21</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body2">TRANSPORTE DE AGREGADOS ITABIRA MG</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">R$ 14.191,32</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">R$ 0,00</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">- R$ 14.191,32</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ backgroundColor: '#9370DB', padding: '8px', borderRadius: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="body1" fontWeight="bold">Total:</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">R$ 67.740,79</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">R$ 41.954,26</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">- R$ 25.784,53</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
