import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
  let channelA = colorChannelA * amountToMix;
  let channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};

const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return `rgb(${r}, ${g}, ${b})`;
};

const COLORS = {
  // Colors used - https://materialui.co/flatuicolors
  primaryColor: [52, 152, 219], // Red (Pomegranate) rgb(52, 152, 219)
  secondColor: [52, 152, 219], // Green (Nephritis)
  accentColor: [52, 152, 219], // Orange (Oragne)
};
const COLORSS = {
  // Colors used - https://materialui.co/flatuicolors
  primaryColor: [52, 152, 219], // Red (Pomegranate)
  secondColor: [52, 152, 219], // Green (Nephritis)
  accentColor: [52, 152, 219], // Orange (Oragne)
};
const WeightBar: React.FC<{ percent: number; durability?: boolean, strokesize: number }> = ({ percent, durability, strokesize }) => {
  const color = React.useMemo(
    () =>
      percent >= 50
        ? colorMixer(COLORS.accentColor, COLORS.secondColor, percent / 100)
        : colorMixer(COLORS.accentColor, COLORS.secondColor, percent / 100),
    [durability, percent]
  );
  const colorr = React.useMemo(
    () =>
      percent < 50
        ? colorMixer(COLORSS.secondColor, COLORSS.accentColor, percent / 100)
        : colorMixer(COLORSS.primaryColor, COLORSS.accentColor, percent / 100),
    [durability, percent]
  );
  return (
    <CircularProgressbarWithChildren
      strokeWidth={strokesize}
      styles={buildStyles({
        rotation: 0.3,
        strokeLinecap: 'round',
        pathTransitionDuration: 0.5,
        pathTransition: 'stroke-dashoffset 0.5s ease 0s',
        // Colors
        pathColor: durability ? colorr : color,
        trailColor: 'grey',
      })}
      className={durability ? 'durability-bar' : 'weight-bar'}
      value={percent}
    >
      <i   //<i class="fa-solid fa-bag-shopping"></i>
        className={
          percent > 70 ? durability ? '' : 'fa-light fa-bag-shopping fa-beat-fade' : durability ? '' : 'fa-regular fa-bag-shopping'
        }
        style={
          durability
            ? {

            }
            : {
              fontSize: '0.7vw',
              marginLeft: '0.25vw',
              marginTop: '0.4vw',
              animationDuration: '3s',
            }
        }
      />
    </CircularProgressbarWithChildren>
  );
};
export default WeightBar;
