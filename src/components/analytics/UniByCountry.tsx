import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ICountryAndCount } from "../../models/analytics";
import { useMemo } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const renderColorfulLegendText = (value: string, entry: any) => {
  return (
    <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
      {value}
    </span>
  );
};

const UniByCountry = ({ data }: { data: ICountryAndCount[] }) => {
  // format data before passing to PieChart
  const formattedData = useMemo(() => {
    return data.map((entry) => {
      return { name: entry.country, value: entry.universities };
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" iconType="circle" formatter={renderColorfulLegendText} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default UniByCountry;
