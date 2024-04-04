import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { DataTable } from './type';
import Sound from '../../../components/Sound';
import data from './vocabulario.json';
import style from './style.module.sass';

const Library: React.FC = (): JSX.Element => {
  const [dataTable, setData] = useState<DataTable[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    setData(data[tabIndex].table);
  }, []);

  const handlerOnTab = (index: number): void => {
    setData(data[index].table);
    setTabIndex(index);
  }

  return (
    <section className={style.vocabularies}>
      <header className={style.vocabularies__header}>
        <h1>Librería</h1>
      </header>
      <div className={style.vocabularies__container}>
        <aside className={style.vocabularies__aside}>
          <ul className={style.vocabularies__tabs}>
            {data.map(({ tab }: any, index: number): JSX.Element => (
              <li
                key={index}
                onClick={() => handlerOnTab(index)}
                className={`${style.vocabularies__tab} ${tabIndex === index  ? style['vocabularies__tab--focus'] : ''}`}
              >
                <span className={style.vocabularies__section}>
                  {tab}
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <Table
          data={dataTable}
          style={style}
          custom={{
            english: {
              value: 'Ingles'
            },
            spanish: {
              value: 'Español'
            },
            pronunciation: {
              value: 'Audio',
              render: (value: string): JSX.Element =>
                <Sound src={value} style={style} />
            },
            reference: {
              value: 'Referencia',
              render: (value: string): JSX.Element => 
                <img
                  alt="vocabulary image"
                  className={style.table__image}
                  src={value}
                  loading="lazy"
                />
            },
          }}
        />
      </div>
    </section>
  );
}

export default Library;
