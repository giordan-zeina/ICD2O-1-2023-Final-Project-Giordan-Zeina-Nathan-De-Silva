// Copyright (c) 2024 Nathan De Silva and Giordan Zeina All rights reserved
//
// Created by: Nathan De Silva and Giordan Zeina
// Created on: May 2024
// This file contains the JS functions for index.html

const wheel = document.getElementById("wheel")
const spinBtn = document.getElementById("spin-btn")
const finalValue = document.getElementById("final-value")

// Stores the value of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
]

// Size of each piece
const data = [16, 16, 16, 16, 16, 16]

// Colour of each piece
var pieColours = [
  "#0099ff",
  "#ff1a21",
  "#ff66ff",
  "#ffff1a",
  "#99ff33",
  "#7300e6",
]

// Chart
let myChart = new Chart(wheel, {
  // Plugin for showing text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels
    labels: [1, 2, 3, 4, 5, 6],
    // Pie settings
    datasets: [
      {
        backgroundColour: pieColours
      },
    ],
  },
  options: {
    // Responsive Chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // display labels inside pie chart
      datalabels: {
        colour: "#ffffff",
        formatter: (_,context) =>
          context.chart.data.labels[context.dataIndex],
        font: { size: 24}
      }
    },
  },
});

// display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for(let i of rotationValues){
    // if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`
      spinBtn.disabled = false
      break
    }
  }
};

// Spinner count
let count = 0

// 100 rotations for animation and last rotaion for result
let resultValue = 101

// Start spinning
spinBtn.addEventListener("click", () => {
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0)
  // Interval for rotation animation
  let rotaionInterval = window.setInterval(()=>{
    // Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count.
    Eventually on last rotation we rotate by 1 degree at a time.
    */
   myChart.options.rotation = myChart.options.
   rotation + resultValue
   // Update chart with new value
   myChart.update()
   // If rotation>360 reset it back 0
   if (myChart.options.rotation >= 360) {
    count += 1
    resultValue -= 5
    myChart.options.rotation = 0
   }
   else if(count> 15 && myChart.options.rotation) {
    valueGenerator(randomDegree)
    clearInterval(rotationInterval)
    count = 
    resultValue = 101
   }
  }, 10)
})