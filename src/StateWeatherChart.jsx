import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Label
} from "recharts";
import { Typography, useTheme } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import "./StateWeatherChart.css";

const stateData = [
  { state: "Gujarat", temperature: 32 },
  { state: "Maharashtra", temperature: 30 },
  { state: "Rajasthan", temperature: 35 },
  { state: "Karnataka", temperature: 28 },
  { state: "Punjab", temperature: 25 },
];

export default function StateWeatherChart() {
  const theme = useTheme();

  return (
    <div className="state-chart-container">
      <div className="chart-header">
        <TrendingUpIcon fontSize="medium" className="chart-icon" />
        <Typography variant="h6" className="chart-title">
          State-wise Temperature Comparison
        </Typography>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={stateData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.divider} 
          />
          <XAxis 
            dataKey="state" 
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
          >
            <Label 
              value="Indian States" 
              offset={-10} 
              position="insideBottom" 
              fill={theme.palette.text.secondary}
            />
          </XAxis>
          <YAxis 
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
          >
            <Label 
              angle={-90} 
              value="Temperature (°C)" 
              position="insideLeft" 
              fill={theme.palette.text.secondary}
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            contentStyle={{
              background: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              borderRadius: '8px',
              color: theme.palette.text.primary
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          <Bar 
            dataKey="temperature" 
            fill={theme.palette.primary.main}
            radius={[4, 4, 0, 0]}
            name="Avg. Temp (°C)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}