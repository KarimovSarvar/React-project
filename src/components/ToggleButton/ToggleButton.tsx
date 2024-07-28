import { useState } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import './ToggleButton.css';

const ToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(!toggled);
    toggleTheme();
  };

  return (
    <>
      <span>Light theme</span>
      <button
        className={`toggle-button ${theme} ${toggled ? 'toggled' : ''}`}
        onClick={handleClick}
      >
        <div className="thumb"></div>
      </button>
      <span>Dark theme</span>
    </>
  );
};

export default ToggleButton;
