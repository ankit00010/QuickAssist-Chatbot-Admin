import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface BarChartDataProps {
  label: string[];
  viewData: number[];
  title: string;
}

const BarChartData: React.FC<BarChartDataProps> = ({
  label,
  viewData,
  title,
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const backgroundColors = [
      "rgba(255, 159, 64, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(153, 102, 255, 0.2)",
    ];

    const borderColors = [
      "rgb(255, 159, 64)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(153, 102, 255)",
    ];

    // Data
    const data = {
      labels: label,
      datasets: [
        {
          label: title,
          data: viewData,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    // Options with custom legend styling
    const options = {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16,
              weight: "bold",
            },
            color: "black",
            usePointStyle: true,
            padding: 15,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [label, viewData]);

  return (
    <div>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChartData;
