import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  data: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor?: string[] }[];
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Pizza',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
