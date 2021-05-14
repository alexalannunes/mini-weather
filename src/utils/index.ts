// import iconSunLight from "../assets/light/sun.svg";
import iconSunDark from "../assets/dark/sun.svg";
import iconMoonLight from "../assets/light/moon.svg";
// import iconMoonDark from "../assets/dark/moon.svg";

const getDayMode = () => {
  const hour = new Date().getHours();

  // dia
  if (hour > 5 && hour < 18) {
    return "light";
  } else if ((hour >= 0 && hour <= 5) || (hour >= 18 && hour < 24)) {
    return "dark";
  }
  return "light";
};

const theme = {
  light: {
    background: "#e1eaf2",
    foreground: "#090b11",
    icon: iconSunDark,
  },
  dark: {
    background: "#090b11",
    foreground: "#e1eaf2",
    icon: iconMoonLight,
  },
};

const appTheme = theme[getDayMode()];

export { appTheme as theme };
