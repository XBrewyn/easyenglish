import React from 'react';

interface Props {
  style: { [key: string]: any };
  data: Record<string, any>[];
  custom?: {
    [key: string]: {
      value?: string;
      render?: (value: string) => JSX.Element;
      avoid?: boolean;
    };
  };
}

const Table: React.FC<Props> = ({ data, custom = {}, style }) => {
  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  return (
    <table className={style.table}>
      <thead className={style.thead}>
        <tr>
          {columns.map((column: string, index: number) => {
            const customColumn = custom[column];

            if (customColumn?.avoid == true) return null;

            return (
              <th key={index} className={style.column}>
                {customColumn?.value || column}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className={style.tbody}>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex} className={style.tbody__tr}>
            {columns.map((column, colIndex) => {
              const customRow = custom[column];
              const render = customRow?.render ? customRow.render(item[column]) : item[column];

              if (customRow?.avoid == true) return null;

              return (
                <td key={colIndex} className={style.row}>
                  {render}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
