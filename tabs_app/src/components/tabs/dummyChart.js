import React, { useEffect } from "react";
// import { Chart } from "./dummy.styled";

const DummyChart = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    const data = [30, 50, 80, 120];
    const barWidth = 50;
    const barSpacing = 20;
    const startX = 50;
    const startY = canvas.height - 50;
    const maxValue = Math.max(...data);

    context.fillStyle = "#007bff"; // Колір стовпців

    data.forEach((value, index) => {
      const height = (value / maxValue) * (canvas.height - 100);
      const x = startX + (barSpacing + barWidth) * index;
      const y = startY - height;

      context.fillRect(x, y, barWidth, height);
    });
  }, []);

  return (
    <main>
      <canvas id="myCanvas" width={300} height={200}></canvas>
    </main>
  );
};

export default DummyChart;
