import React, { useState } from 'react';
import { Button, RichTextArea, Input } from '../../components/UI';

const Mails = () => {
  const [subject, setSubject] = useState('');
  const [mail, setMail] = useState(
    <>
      <p>Hello World !</p>
      <p>
        This is <em>italic</em> style !
      </p>
    </>,
  );

  return (
    <div id="admin-mails">
      <Input label="Objet :" value={subject} onChange={setSubject}></Input>
      <Button leftIcon="fas fa-paper-plane" onClick={() => {}}>
        Envoyer
      </Button>
      <RichTextArea onChange={setMail} label="Corps du mail">
        {mail}
      </RichTextArea>
    </div>
  );
};

export default Mails;
