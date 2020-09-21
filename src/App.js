import React from 'react';
import Input from './Input';
import './App.css';
import { useTableContext } from './AppContext';

const App = () => {
  const {
    addNewWorker,
    inputList,
    renderTableData,
    inputSearch,
    renderTableHeader,
    sumValueOfSection,
    select,
    setSelect
  } = useTableContext();

  return (
    <div className='App'>
      <h1>Pracownicy</h1>
      <div style={{ width: '100vw' }}>
        {inputSearch.map((item) => (
          <Input
            type={item.type}
            value={item.value}
            set={item.set}
            placeholder={item.placeholder}
            key={item.placeholder}
          />
        ))}
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option value=''>Wybierz dział</option>
          <option value='IT'>IT</option>
          <option value='Administracja'>Administracja</option>
          <option value='Handlowiec'>Handlowiec</option>
        </select>
      </div>
      <table>
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
      {sumValueOfSection()}
      <form
        style={{ display: 'flex', flexDirection: 'column', width: '20%' }}
        onSubmit={(e) => addNewWorker(e)}
      >
        {inputList.map((item) => (
          <Input
            type={item.type}
            value={item.value}
            set={item.set}
            placeholder={item.placeholder}
            key={item.placeholder}
          />
        ))}
        <button type='submit'>DODAJ</button>
      </form>
    </div>
  );
};

export default App;
