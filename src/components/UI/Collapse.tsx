'use client';
import { useState, useEffect, useRef, MouseEvent, ReactNode } from 'react';
import { Icon } from '.';
import { toast } from 'react-toastify';

/**
 * A collapsible component that displays a title and content that can be expanded or collapsed.
 */
const Collapse = ({
  title,
  children,
  className = '',
  id = '',
  initVisible = false,
  link = undefined,
}: {
  /** The title of the collapsible component. */
  title: ReactNode;
  /** The content of the collapsible component. */
  children: ReactNode;
  /** The class name of the collapsible component. */
  id?: string;
  /** The id of the collapsible component. */
  className?: string;
  /** The initial visibility state of the collapsible component. */
  initVisible?: boolean;
  /** The link to copy when clicking on the copy icon. */
  link?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  const setVisible = (visible: boolean) => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    setContentVisible(visible);
  };

  // Set contentHeight when children prop change
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  useEffect(() => {
    setVisible(initVisible);
  }, []);

  let copyLink = undefined;

  if (link) {
    copyLink = (e: MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(link + '#' + id);
      toast.success('Lien copié dans le presse-papier');
    };
  }

  return (
    <div id={id} className={`collapse ${className} ${contentVisible ? 'active' : ''}`}>
      <div className="collapse-title" onClick={() => setVisible(!contentVisible)}>
        <div className="left">
          <div className="collapse-arrow">
            <Icon name="chevron-bottom" strokeWidth={2.5} />
          </div>
          {title}
        </div>

        {copyLink && (
          <div className="right">
            <button type="button" className="copy-link" onClick={copyLink}>
              <Icon name="link" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      <div className="collapse-content" ref={contentRef} style={{ maxHeight: contentVisible ? contentHeight : 0 }}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
