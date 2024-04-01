import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { data } from './data';

const Admin = () => {
  const [dataTable, setData] = useState<{ [key: string]: number | string; }[]>([]);

  useEffect(() => {
    setData(data[0][1]);
  }, []);

  const handlerOnTab = (index: number) => {
    setData(data[index][1]);
  }

  return (
    <section>
      <ul>
        {data.map(([tabName]: any, index: number) => (
          <li onClick={() => handlerOnTab(index)}>
            {tabName}
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
            render: (value: string) => <img src={value} />
          }
        }}
      />
    </section>
  );
}

export default Admin;
