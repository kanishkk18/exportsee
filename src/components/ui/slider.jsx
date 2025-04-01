"use client"

import { useState } from "react"

const Slider = ({ min = 0, max = 100, step = 1, defaultValue = 50 }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(Number(e.target.value))
  }

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`,
    }
  }

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        style={getBackgroundSize()}
      />
      <div className="mt-2 text-center text-sm text-gray-500">Value: {value}</div>
    </div>
  )
}

export default Slider;

