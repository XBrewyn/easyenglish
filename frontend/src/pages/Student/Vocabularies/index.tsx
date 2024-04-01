import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { data } from './data';
import { Data } from './type';

const Vocabularies: React.FC = (): JSX.Element => {
  const [dataTable, setData] = useState<Data[]>([]);

  useEffect(() => {
    setData(data[0][1]);
  }, []);

  const handlerOnTab = (index: number): void => {
    setData(data[index][1]);
  };

  return (
    <section>
      <ul>
        {data.map(([tab]: [string, Data[]], index: number): JSX.Element => (
          <li
            key={index}
            onClick={() => handlerOnTab(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <Table
        data={dataTable}
        style={{}}
        custom={{
          ingles: {
            value: 'Ingles'
          },
          espanol: {
            value: 'Español'
          },
          imagen: {
            render: (value: string): JSX.Element =>
              <img src={value} alt="vocabulary image" />
          }
        }}
      />
    </section>
  );
}

export default Vocabularies;
