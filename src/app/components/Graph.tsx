import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    pressure: 4000,
    flow: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pressure: 3000,
    flow: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pressure: 2000,
    flow: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pressure: 2780,
    flow: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    pressure: 1890,
    flow: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    pressure: 2390,
    flow: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    pressure: 3490,
    flow: 4300,
    amt: 2100,
  },
];

export default function Graph() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pressure" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="flow" stroke="#82ca9d" />
                </LineChart>
        </ResponsiveContainer>
    );
}

