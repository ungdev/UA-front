import React, { useState } from 'react';
import { Button, Textarea, RichTextarea, Input } from '../../components/UI';

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

  const mailTextarea = RichTextarea.create();

  const setStyleInSelection = (style) => {
    RichTextarea.update(mailTextarea);
    const selection = RichTextarea.getSelection(mailTextarea);
    RichTextarea.setStyle(mailTextarea, style, selection);
    setMail(RichTextarea.buildContent(mailTextarea));
  };

  return (
    <div id="admin-mails">
      <Input label="Objet :" value={subject} onChange={setSubject}></Input>
      <Button onClick={() => {}}>Envoyer</Button>
      <Button onClick={() => setStyleInSelection('italic')}>Italique</Button>
      <Button onClick={() => setStyleInSelection('bold')}>Gras</Button>
      <RichTextarea.Component richTextarea={mailTextarea} label="Corps du mail">
        {mail}
      </RichTextarea.Component>
      ;
    </div>
  );
};

export default Mails;
