import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./MultiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        {/* <div className="slider__left-value">{minVal} ₽</div>
        <div className="slider__right-value">{maxVal} ₽</div> */}
        <div className="slider__left-value">
          <input
            // className="slider__left-value"
            type="number"
            value={minVal}
            placeholder=""
            min={0}
            max={892}
            onChange={(event) => {
              const value = event.target.value;
              setMinVal(value);
              // minValRef.current = minVal;
            }}
          />
          ₽
        </div>
        <div className="slider__right-value">
          <input
            // className="slider__right-value"
            type="number"
            value={maxVal}
            placeholder=""
            min={108}
            max={1000}
            onChange={(event) => {
              const value = event.target.value;
              setMaxVal(value);
              maxValRef.current = value;
            }}
          />
          ₽
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal || 0}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 108);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal || minVal + 108}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 108);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
