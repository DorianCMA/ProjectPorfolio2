import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AuthContext from "../AuthContext";

const StatisticsBar = () => {
  const [data, setData] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://deploy-sand-mu.vercel.app/department/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        setData(response.data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart
        data={data}
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="department_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="department_salary" fill="#6b48ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsBar;
