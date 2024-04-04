import React, { useContext, useEffect, useState } from 'react';
import Table from '../../components/Table';
import style from './style.module.sass';
import Modal from '../../components/Modal';
import Form from './Form';
import { send } from '../../tools/function';
import context from '../../global/state/context';
import { State } from '../../components/Form/type';
import { Payload } from '../../global/state/type';
import { CLEAR_LOAD, SET_LOAD } from '../../global/state/actionTypes';

type ActionType = 'edit' | 'add';

const Admin: React.FC = (): JSX.Element => {
  const [dataWord, setDataWord] = useState<any>([])
  const [dataSentences, setDataSentences] = useState<any>([]);
  const [canShowModal, setCanShowModal] = useState<boolean>(false);
  const [fieldState, setFieldState] = useState<{ [key: string]: any }>({});
  const [actionType, setActionType] = useState<ActionType>('edit');
  const [globalState, dispatch] = useContext(context);

  useEffect(() => {
    addWord();
  }, []);

  const addWord = async (): Promise<void> => {
    dispatch({
      type: SET_LOAD,
      payload: {
        text: 'cargando contenido',
        canShow: true
      }
    });

    const words: Response = await send({ api: 'words' }).get();
    const sentences: Response = await send({ api: 'sentences' }).get();

    setDataSentences(sentences);
    setDataWord(words);
    dispatch({ type: CLEAR_LOAD });
  }

  const handlerOnSend = (data: { [key: string]: string; }): void => {
    setCanShowModal(false);
    console.log(fieldState);
  };

  const closeModal = (): void => {
    setCanShowModal(false);
    setFieldState({});
  };

  const handlerOnAdd = (item: { [key: string]: any; }): void => {
    action(item, 'add');
  };

  const handlerOnEdit = (item: { [key: string]: any; }): void => {
    action(item, 'edit');
  };

  const action = (item: { [key: string]: any }, type: ActionType): void => {
    setCanShowModal(true);
    setFieldState(item);
    setActionType(type);
  };

  return (
    <section className={style.admin}>
      <div className={style.admin}>
        <header className={style.admin__header}>
          <h2>Palabras</h2>
        </header>
        <Table
          action={{ edit: handlerOnEdit }}
          data={dataWord}
          style={style}
          custom={{
            englishWord: { value: 'Ingles' },
            spanishTranslation: { value: 'Español' },
            _id: { avoid: true }
          }}
        />
      </div>
      <div>
        <header className={style.admin__header}>
          <h2>Oraciones</h2>
        </header>
        <Table
          action={{ edit: handlerOnEdit }}
          data={dataSentences}
          style={style}
          custom={{
            englishWord: { value: 'Ingles' },
            spanishTranslation: { value: 'Español' },
            _id: { avoid: true }
          }}
        />
      </div>
      <Modal
        canShow={canShowModal}
        text="Por favor, escriba los campos correctamente."
        title="Formulario"
        onClose={closeModal}
      >
        <Form
          state={[fieldState, setFieldState]}
          onClick={handlerOnSend}
        />
      </Modal>
    </section>
  );
}

export default Admin;
