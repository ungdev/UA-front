import React from 'react';

import { Title, Collapse } from '../components/UI';
import faq from '../assets/faq';

import './faq.css';

const FAQ = () => (
  <div id="faq">
    <Title align="center">FAQ</Title>

    {faq.map((category) => (
      <div key={category.title} className="margin-bottom">
        <Title level={3}>{category.title}</Title>
        {category.entries.map((entrie, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Collapse key={`${category.title}-${i}`} title={entrie.question}>
            {entrie.answer}
          </Collapse>
        ))}
      </div>
    ))}
  </div>
);

export default FAQ;
