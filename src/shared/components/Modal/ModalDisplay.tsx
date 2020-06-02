import React, { FunctionComponent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// import { CardDisplay } from '../index';

// This could be expanded here to talk in a type of modal. Placeholder for now
type useModalProps = {
  data: unknown[];
};
type Hook = (data: unknown[]) => FunctionComponent<useModalProps>;

const useModal: Hook = data => {
  // eslint-disable-next-line no-console
  console.log(data);
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  // const handleShow = (): void => setShow(true);

  const jsx = () => (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  return jsx;
  // return <CardDisplay data={data} />;
};

export { useModal };
