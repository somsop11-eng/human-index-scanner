/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GaugeChart = ({ score }) => {
    // Logic to determine color based on score
    const getColor = (value) => {
        if (value <= 25) return "#ff003c"; // Extreme Fear (Red)
        if (value <= 45) return "#ff8c00"; // Fear (Orange)
        if (value <= 55) return "#ffff00"; // Neutral (Yellow)
        if (value <= 75) return "#adff2f"; // Greed (Light Green)
        return "#00ff41"; // Extreme Greed (Neon Green)
    };

    const data = [
        { name: "Score", value: score, color: getColor(score) },
        { name: "Remaining", value: 100 - score, color: "#333" },
    ];

    // Logic for the needle
    const RADIAN = Math.PI / 180;
    const needleValue = score;
    const cx = "50%";
    const cy = "70%"; // Lower the center so we see a semi-circle mostly
    const iR = 60;
    const oR = 100;
    const ang = 180 * (1 - needleValue / 100);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);

    return (
        <div className="w-full h-64 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Needle / Value Text */}
            <div className="absolute top-[60%] text-4xl font-bold font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {score}
            </div>

            {/* Needle Visualization (Simple SVG Line on top) */}
            {/* Note: Implementing a true SVG needle inside Recharts is complex. 
           For this MVP, the specific color fill of the gauge and the large number 
           is a sufficient "Gauge" representation. 
           But let's add a small marker text. */}
        </div>
    );
};

export default GaugeChart;
