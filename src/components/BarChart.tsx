import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  data: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Barras',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
