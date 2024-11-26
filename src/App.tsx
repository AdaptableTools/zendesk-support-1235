import { useState } from 'react';
import { AdaptableAgGridFirst } from './AdaptableAgGrid';
import { AdaptableAgGridSecond } from './AdaptableAgGrid/AdaptableAgGridSecond.tsx';
import { AdaptableAgGridThird } from './AdaptableAgGrid/AdaptableAgGridThird.tsx';

function App() {
  const [toggle, setToggle] = useState<number>(1);
  const [hide, setHide] = useState<boolean>(false);

  return (
    <div>
      <button name="toggleGrid" onClick={() => setToggle((toggle % 3) + 1)}>
        ToggleGrid
      </button>
      <button name="toggleGrid" onClick={() => setHide(!hide)}>
        {hide ? 'Show Grid' : 'Hide Grid'}
      </button>
      {!hide && toggle === 1 && <AdaptableAgGridFirst></AdaptableAgGridFirst>}
      {!hide && toggle === 2 && <AdaptableAgGridSecond></AdaptableAgGridSecond>}
      {!hide && toggle === 3 && <AdaptableAgGridThird></AdaptableAgGridThird>}
    </div>
  );
}

export default App;
