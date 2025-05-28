import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function SpeedoMeter({ data }) {
  let value;
  if (data === "No stress") {
    value = 4;
  } else if (data === "Mild to Moderate Level") {
    value = 10;
  } else {
    value = 18;
  }
  return (
    <ReactSpeedometer
      maxValue={21}
      value={value}
      needleColor="black"
      segments={3}
      currentValueText="Stress Level"
      segmentColors={["green", "yellow", "red"]}
      width={250}
      height={150}
      customSegmentLabels={[
        {
          text: "Normal",
          position: "INSIDE",
          color: "#fff",
        },
        {
          text: "Moderate",
          position: "INSIDE",
          color: "#555",
        },
        {
          text: "Severe",
          position: "INSIDE",
          color: "#fff",
        },
      ]}
    />
  );
}
