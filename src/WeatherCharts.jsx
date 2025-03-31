import React, { useState } from "react";
import "./StateWeatherChart.css";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Label
} from "recharts";
import { 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Typography,
  Box,
  useTheme
} from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import "./WeatherChart.css";

// Static Weather Data (Temperature trends over time)
const weatherData = {
    year: [
        { month: "Jan", temp: 12 }, { month: "Feb", temp: 15 },
        { month: "Mar", temp: 18 }, { month: "Apr", temp: 22 },
        { month: "May", temp: 28 }, { month: "Jun", temp: 32 },
        { month: "Jul", temp: 30 }, { month: "Aug", temp: 29 },
        { month: "Sep", temp: 26 }, { month: "Oct", temp: 20 },
        { month: "Nov", temp: 16 }, { month: "Dec", temp: 13 }
    ],
    month: [
        { day: "1", temp: 22 }, { day: "2", temp: 24 },
        { day: "3", temp: 26 }, { day: "4", temp: 28 },
        { day: "5", temp: 29 }, { day: "6", temp: 31 },
        { day: "7", temp: 30 }, { day: "8", temp: 28 },
        { day: "9", temp: 26 }, { day: "10", temp: 24 }
    ],
    week: [
        { day: "Mon", temp: 25 }, { day: "Tue", temp: 26 },
        { day: "Wed", temp: 27 }, { day: "Thu", temp: 28 },
        { day: "Fri", temp: 29 }, { day: "Sat", temp: 30 },
        { day: "Sun", temp: 28 }
    ]
};

export default function WeatherChart() {
    const [timeframe, setTimeframe] = useState("year");
    const theme = useTheme();

    return (
        <Box className="weather-chart-container">
            <Box className="chart-header">
                <TimelineIcon fontSize="medium" className="chart-icon" />
                <Typography variant="h6" className="chart-title">
                    Temperature Trends
                </Typography>
            </Box>
            
            <FormControl className="timeframe-selector">
                <InputLabel className="select-label">Timeframe</InputLabel>
                <Select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="select-input"
                >
                    <MenuItem value="year">Yearly</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="week">Weekly</MenuItem>
                </Select>
            </FormControl>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    data={weatherData[timeframe]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={theme.palette.divider} 
                    />
                    <XAxis 
                        dataKey={timeframe === "year" ? "month" : "day"} 
                        tick={{ fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                    >
                        <Label 
                            value={timeframe === "year" ? "Months" : timeframe === "month" ? "Days" : "Weekdays"} 
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
                    <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke={theme.palette.primary.main}
                        strokeWidth={2}
                        dot={{ fill: theme.palette.secondary.main }}
                        activeDot={{ r: 6, fill: theme.palette.error.main }}
                        name="Temperature"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}