import React from 'react';

import { Title, Collapse } from '../components/UI';
import faq from '../assets/faq';

import './faq.css';

const FAQ = () => (
  <div id="faq">
    <Title align="center">FAQ</Title>

    {faq.map((category) => (
      <div key={category.title} className="faq-category">
        <Title level={3}>{category.title}</Title>

        {category.entries.map((entry, i) => (
          <Collapse key={`${category.title}-${i}`} title={entry.question}>
            {entry.answer}
          </Collapse>
        ))}
      </div>
    ))}
  </div>
);

export default FAQ;