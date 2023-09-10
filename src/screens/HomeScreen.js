import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

const HomeScreen = () => {
  const circleRef = useRef();
  const [progress, setProgress] = useState(0); // Progreso calculado en base al tiempo transcurrido

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const startDate = new Date("2023-08-15"); // Fecha de inicio
  const currentDate = new Date();
  const timeDifference = currentDate - startDate;
  const daysPassed = Math.min(
    Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    21
  ); // Máximo 21 días
  const calculatedProgress = daysPassed / 21; // 21 días en total

  useEffect(() => {
    setProgress(calculatedProgress);
  }, []);

  const strokeDashoffset = (1 - progress) * circumference;

  return (
    <View>
      <Svg width={2 * radius} height={2 * radius}>
        {/* Círculo semitransparente de fondo */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="rgba(230, 126, 34, 0.3)"
        />
        {/* Círculo de progreso */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="transparent"
          stroke="#E67E22"
          strokeWidth={10}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          ref={circleRef}
        />
        {/* Etiquetas para los días */}

        <SvgText
          x={radius * 2 - 15}
          y={radius}
          textAnchor="middle"
          fill="black"
        >
          Día 1
        </SvgText>
        {/* Mensaje especial en el día 21 */}
        {daysPassed >= 21 && (
          <SvgText x={radius} y={radius + 5} textAnchor="middle" fill="#E67E22">
            ¡Lo lograste!
          </SvgText>
        )}
      </Svg>
    </View>
  );
};

export default HomeScreen;
