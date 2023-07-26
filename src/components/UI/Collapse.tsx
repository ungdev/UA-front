import { useState, useEffect, useRef } from 'react';

/**
 * A collapsible component that displays a title and content that can be expanded or collapsed.
 * @param {string} title - The title of the collapsible component.
 * @param {ReactNode} children - The content of the collapsible component.
 * @param {string} className - The class name of the collapsible component.
 * @param {boolean} initVisible - The initial visibility state of the collapsible component.
 * @returns {JSX.Element} - The Collapse component.
 */
const Collapse = ({
  title,
  children,
  className,
  initVisible,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  initVisible?: boolean;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  const setVisible = (visible: any) => {
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

  return (
    <div className={`collapse ${className} ${contentVisible ? 'active' : ''}`}>
      <div className="collapse-title" onClick={() => setVisible(!contentVisible)}>
        {title}

        <div className="collapse-arrow">
          <i className="fas fa-chevron-down" />
        </div>
      </div>

      <div className="collapse-content" ref={contentRef} style={{ maxHeight: contentVisible ? contentHeight : 0 }}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
