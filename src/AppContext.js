import React, { createContext, useState, useContext } from 'react';
import PRACOWNICY from './PRACOWNICY';

const AppContext = createContext();

const { Provider } = AppContext;

const AppContextProvider = props => {
  const [workers, setWorkers] = useState(PRACOWNICY);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [section, setSection] = useState('');
  const [salary, setSalary] = useState('');
  const [currency, setCurrency] = useState('');
  const [select, setSelect] = useState('');
  const [word, setWord] = useState('');
  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(5000);

  const inputList = [
    {
      type: 'text',
      value: name,
      set: (e) => setName(e.target.value),
      placeholder: 'Imie...'
    },
    {
      type: 'text',
      value: surname,
      set: (e) => setSurname(e.target.value),
      placeholder: 'Nazwisko...'
    },
    {
      type: 'text',
      value: section,
      set: (e) => setSection(e.target.value),
      placeholder: 'Dzial...'
    },
    {
      type: 'number',
      value: salary,
      set: (e) => setSalary(e.target.value),
      placeholder: 'Kwota wynagrodzenia...'
    },
    {
      type: 'text',
      value: currency,
      set: (e) => setCurrency(e.target.value),
      placeholder: 'Waluta wynagrodzenia...'
    }
  ];

  const inputSearch = [
    {
      type: 'text',
      value: word,
      set: (e) => setWord(e.target.value),
      placeholder: 'Szukaj...'
    },
    {
      type: 'number',
      value: inputFrom,
      set: (e) => setInputFrom(e.target.value),
      placeholder: 'Od...'
    },
    {
      type: 'number',
      value: inputTo,
      set: (e) => setInputTo(e.target.value),
      placeholder: 'Do...'
    }
  ];

  const renderTableData = () => {
    var filterInput = workers.filter(
      (worker) =>
        worker.imie.toLowerCase().includes(word.toLowerCase()) ||
        worker.nazwisko.toLowerCase().includes(word.toLowerCase())
    );

    var filterSalary = filterInput.filter(
      (worker) =>
        inputTo > Number(worker.wynagrodzenieKwota) &&
        Number(worker.wynagrodzenieKwota) >= inputFrom
    );

    var filterSelect = filterSalary.filter((worker) => {
      if (select != '') {
        return worker.dzial == select;
      } else {
        return filterSalary;
      }
    });

    return filterSelect.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.imie}</td>
          <td>{item.nazwisko}</td>
          <td>{item.dzial}</td>
          <td>{item.wynagrodzenieKwota}</td>
          <td>{item.wynagrodzenieWaluta}</td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    const header = Object.keys(workers[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const sumValueOfSection = () => {
    var arrIT = [];
    var arrAdmin = [];
    var arrBus = [];

    workers.map((item) => {
      if (item.dzial == 'IT') {
        arrIT.push(Number(item.wynagrodzenieKwota));
      } else if (item.dzial == 'Administracja') {
        arrAdmin.push(Number(item.wynagrodzenieKwota));
      } else {
        arrBus.push(Number(item.wynagrodzenieKwota));
      }
    });

    let sumIT = arrIT.reduce((a, b) => {
      return a + b;
    });
    let sumAdmin = arrAdmin.reduce((a, b) => {
      return a + b;
    });
    let sumTotal = sumIT + sumAdmin + arrBus[0];

    return (
      <div className='p-container'>
        <p>IT: {sumIT} PLN</p>
        <p>Administracja: {sumAdmin} PLN</p>
        <p>Handlowiec: {arrBus[0]} PLN</p>
        <p>Suma: {sumTotal} PLN</p>
      </div>
    );
  };

  const addNewWorker = (e) => {
    e.preventDefault();
    const newItem = {
      imie: name,
      nazwisko: surname,
      dzial: section,
      wynagrodzenieKwota: salary,
      wynagrodzenieWaluta: currency
    };
    const newList = [...workers];
    newList.push(newItem);
    setWorkers(newList);
    setName('');
    setSurname('');
    setSection('');
    setSalary('');
    setCurrency('');
  };

  return (
    <Provider
      value={{
        setWorkers,
        setName,
        setSurname,
        setSalary,
        setCurrency,
        setSection,
        name,
        surname,
        section,
        salary,
        currency,
        addNewWorker,
        workers,
        sumValueOfSection,
        renderTableData,
        renderTableHeader,
        select,
        setSelect,
        word,
        setWord,
        inputFrom,
        setInputFrom,
        inputTo,
        setInputTo,
        inputList,
        inputSearch
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useTableContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;