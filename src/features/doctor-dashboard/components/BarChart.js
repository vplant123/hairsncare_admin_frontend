import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function Barchart(){
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
       
        },
        {
          "name": "Page B",
          "uv": 3000,
     
        },
        {
          "name": "Page C",
          "uv": 2000,
       
        },
        {
          "name": "Page D",
          "uv": 2780,
       
        },
        {
          "name": "Page E",
          "uv": 1890,
       
        },
        {
          "name": "Page F",
          "uv": 2390,
     
        },
        {
          "name": "Page G",
          "uv": 3490,
      
        }
      ]
    return( <BarChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>)
}

  export default Barchart
                              
 