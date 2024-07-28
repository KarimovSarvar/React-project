import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { unselectAll } from '@/slices/SelectedItemsSlice';
import { useTheme } from '@/theme/ThemeContext';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems,
  );
  const { theme } = useTheme();
  const selectedItemsCount = Object.keys(selectedItems).length;

  if (selectedItemsCount === 0) {
    return null;
  }

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <div className={`flyout ${theme}`}>
      <p>{selectedItemsCount} items are selected</p>
      <div className="flyout-buttons">
        <button onClick={handleUnselectAll} className="flyout-button">
          Unselect all
        </button>
        <button className="flyout-button">Download</button>
      </div>
    </div>
  );
};

export default Flyout;
