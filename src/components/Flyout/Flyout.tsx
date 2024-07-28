import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { unselectAll } from '@/slices/SelectedItemsSlice';
import { useTheme } from '@/theme/ThemeContext';
import { saveAs } from 'file-saver';
import { generateCSVContent } from '@/utils/fileSaver';
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

  const handleDownload = () => {
    const csvContent = generateCSVContent(selectedItems);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItemsCount}_items.csv`);
  };

  return (
    <div className={`flyout ${theme}`}>
      <p>{selectedItemsCount} items are selected</p>
      <div className="flyout-buttons">
        <button onClick={handleUnselectAll} className="flyout-button">
          Unselect all
        </button>
        <button onClick={handleDownload} className="flyout-button">
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
