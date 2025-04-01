import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

function ShadcnStyleBarChart({ data, className, title, description }) {
  const chartData = useMemo(() => {
    return data
      .map((item) => ({
        name: item.name,
        value: item.length,
      }))
      .filter((item) => item.value !== 0);
  }, [data]);

  const maxValue = useMemo(() => {
    return chartData.length > 0
      ? Math.max(...chartData.map((item) => item.value))
      : 0;
  }, [chartData]);

  // Calculate suggested tick values for Y axis
  const yAxisTicks = useMemo(() => {
    const tickCount = 5;
    const step = Math.ceil(maxValue / (tickCount - 1));
    return Array.from({ length: tickCount }, (_, i) => i * step);
  }, [maxValue]);

  return (
    <div className={`w-full  ${className}`}>
      <div className="header">
        <h3 className="text-lg font-semibold">{title || 'Data Distribution'}</h3>
        <p>{description || 'Distribution of data across categories'}</p>
      </div>
      <div className=" hover:bg-transparent">
        <div className="h-[500px] w-full mt-4 hover:bg-transparent">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="hsl(var(--muted-foreground))" 
                opacity={0.2}
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={8}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[0, maxValue]}
                ticks={yAxisTicks}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{
                  color: 'hsl(var(--foreground))',
                  fontWeight: 500,
                  marginBottom: '0.25rem',
                }}
                itemStyle={{
                  color: 'hsl(var(--muted-foreground))',
                  fontSize: '0.875rem',
                }}
                formatter={(value) => [`${value}`, 'Count']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                fill="hsl(var(--primary))"
                maxBarSize={60}
                animationDuration={1000}
                animationBegin={0}
                onMouseEnter={(data, index) => {
                  // Add hover effect by changing the bar's opacity
                  const bars = document.querySelectorAll('.recharts-bar-rectangle');
                  bars.forEach((bar, i) => {
                    if (i !== index) {
                      bar.style.opacity = '0.5';
                    }
                  });
                }}
                onMouseLeave={() => {
                  // Reset opacity on mouse leave
                  const bars = document.querySelectorAll('.recharts-bar-rectangle');
                  bars.forEach((bar) => {
                    bar.style.opacity = '1';
                  });
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

ShadcnStyleBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      length: PropTypes.number.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ShadcnStyleBarChart;
