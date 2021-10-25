import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '.';

/** This component is the equivalent of a normal textarea, but you can write html code in it. */
const RichTextArea = ({ label, className, children, onChange }) => {
  let content = [];
  const ref = React.useRef();
  const editor = (
    <div
      className="rich-textarea-editor"
      contentEditable={true}
      spellCheck={true}
      ref={ref}
      suppressContentEditableWarning={true}>
      {children}
    </div>
  );

  /*
  Returns the content in the editor.
  If the HTML content is :
    <p>Hello World !</p>
    <p>This is <em>italic</em> style !</p>
  Then, the following object will be returned :
  [
    {
      id: 1,
      type: "text",
      parent: 0,
      children: "Hello World !",
      textLength: 13,
      startsAt: 0
    },
    {
      id: 2,
      type: "container",
      parent: -1
      children: [3, 4, 6],
      textLength: 22,
      startsAt: 13
    },
    {
      id: 3,
      parent: 2
      type: "text",
      children: "This is ",
      textLength: 8,
      startsAt: 13
    },
    {
      id: 4,
      type: "italic",
      parent: 2
      children: [5],
      textLength: 6,
      startsAt: 21
    },
    {
      id: 5,
      type: "text",
      parent: 4
      children: "italic",
      textLength: 6,
      startsAt: 21
    }
    {
      id: 6,
      type: "text",
      children: " style !",
      textLength: 8,
      startsAt: 27
    }
  ]
  */
  const update = () => {
    content = [];
    if (!!ref.current) internal.updateNode(ref.current, -1);
  };

  const getSelection = () => {
    // Update cached node positions
    update();
    const selection = window.getSelection();
    // Anchor node is the node where selection begins
    const anchorNodeId = internal.findNodeId(selection.anchorNode);
    // Focus node is the node where selection ends
    const focusNodeId = internal.findNodeId(selection.focusNode);
    return {
      from: { nodeId: anchorNodeId, offset: selection.anchorOffset },
      to: { nodeId: focusNodeId, offset: selection.focusOffset },
    };
  };

  const setStyle = (style, selection) => {
    const startNode = content[selection.from.nodeId];
    const endNode = content[selection.to.nodeId];
    if (startNode === endNode) {
      // Prevent from styling the same tag twice with this check
      internal.addStyleOnText(style, startNode, selection.from.offset, selection.to.offset);
    } else {
      internal.getTextsBetween(startNode, endNode).forEach((text) => internal.addStyleOnText(style, text, 0, -1));
      internal.addStyleOnText(style, startNode, selection.from.offset, -1);
      internal.addStyleOnText(style, endNode, 0, selection.to.offset);
    }
  };

  const buildContent = () => (
    <>{content.filter((element) => element.parent === -1).map((rootElement) => internal.buildNode(rootElement))}</>
  );

  /* These methods should not be used outside of this file. They are used for internal stuff */
  const internal = {
    /*
  Called by RichTextarea.getContent()
    * richTextarea : the pseudo-instance
    * element : the element we want to get the content of
    * parent : the id of its parent
    * idAndCurrentTextLength : an object with key "id" which is the id of this element,
                                and the key "currentTextLength" which is the index of the first character
                                of the entire editor.
                                These arguments are grouped in 1 object, because we need a reference
                                to update them, so an object is required. Passing 2 objects would probably be redundant.
  */
    updateNode: (parentNode, parentId, cascadedData = { currentId: 0, cumulativeLength: 0 }) =>
      Array.from(parentNode.childNodes).map((element) => {
        // Reserving this place for later (if we don't do that, child nodes will take it)
        const node = {
          id: -1,
          type: 'undefined',
          parent: parentId,
          children: undefined,
          textLength: 0,
          startsAt: -1,
        };
        content.push(node);
        node.type = (() => {
          switch (element.nodeName) {
            case 'DIV':
            case 'P':
              return 'container';
            case '#text':
              return 'text';
            case 'EM':
              return 'italic';
            case 'STRONG':
              return 'bold';
          }
        })();
        node.id = cascadedData.currentId++;
        node.startsAt = cascadedData.cumulativeLength;
        node.children = node.type === 'text' ? element.data : internal.updateNode(element, node.id, cascadedData);
        node.textLength =
          node.type === 'text'
            ? node.children.length
            : node.children.reduce((prev, child) => prev + content[child].textLength, 0);
        if (node.type === 'text') cascadedData.cumulativeLength += node.textLength;
        return node.id;
      }),

    /** Retrieves the index of the node in its parent children */
    getChildId: (node) =>
      node.parent === -1
        ? content.filter((node) => node.parent === -1).indexOf(node)
        : content[node.parent].children.indexOf(node.id),

    /** Used to find the id of an HTML node in our editor */
    findNodeId: (searchedNode) => {
      return content.find((node) => {
        const genealogy = internal.getNodeGenealogy(node);
        let currentHTMLNode = ref.current;
        genealogy.forEach((nodeId) => {
          const childId = internal.getChildId(content[nodeId]);
          currentHTMLNode = currentHTMLNode.childNodes[childId];
        });
        return currentHTMLNode === searchedNode;
      }).id;
    },

    /*
     * Adds a style on a text node, for example italic, bold, ...
     * richTextarea : the pseudo-instance
     * id : the id of the text node we want to add a style to
     * start : where the style shoudl start to be applied
     * end : where the style should stop to be applied (not included)
     */
    addStyleOnText: (style, node, start, end) => {
      if (end === -1) {
        end = node.children.length;
      }

      const newTextNode = {
        id: content.length + 1,
        type: 'text',
        parent: content.length,
        children: node.children.substring(start, end),
        textLength: end - start,
        startsAt: node.startsAt + start,
      };
      const newStyleNode = {
        id: newTextNode.parent,
        type: style,
        parent: node.parent,
        children: [newTextNode.id],
        textLength: newTextNode.textLength,
        startsAt: newTextNode.startsAt,
      };
      content.push(newStyleNode, newTextNode);

      // Adding the new id to the parent's children array
      const siblings = content[node.parent].children;
      const originatingSiblingId = siblings.indexOf(node.id);
      siblings.splice(originatingSiblingId + 1, 0, newStyleNode.id);
      if (end !== node.children.length) {
        const endOfText = {
          id: content.length,
          type: 'text',
          parent: node.parent,
          children: node.children.substr(end),
          textLength: node.textLength - end,
          startsAt: node.startsAt + end,
        };
        content.push(endOfText);
        siblings.splice(originatingSiblingId + 2, 0, endOfText.id);
      }
      if (start === 0) {
        siblings.splice(originatingSiblingId, 1);
      } else {
        node.children = node.children.substr(0, start);
        node.textLength = start;
      }
    },

    /*
     * Returns the genealogy of the node. Does not include the editor (<div>), which is a parent of every node.
     * The array
     */
    getNodeGenealogy: (node) => {
      let parent = node;
      const genealogy = [parent.id];
      while (parent.parent !== -1) {
        parent = content[parent.parent];
        genealogy.unshift(parent.id);
      }
      return genealogy;
    },

    /*
     * This returns a list of all the text between 2 texts.
     * The start and end texts are not included in the returned array.
     * The texts are represented by their respective genealogies.
     */
    getTextsBetween: (startNode, endNode) =>
      content.filter(
        (node) =>
          node.type === 'text' &&
          startNode.startsAt < node.startsAt &&
          endNode.startsAt + endNode.textLength > node.startsAt + node.textLength,
      ),

    buildNode: (node) => {
      if (node.type === 'text') {
        return node.children;
      } else {
        const children = node.children.map((child) => internal.buildNode(content[child]));
        switch (node.type) {
          case 'container':
            return <p key={node.id}>{children}</p>;
          case 'italic':
            return <em key={node.id}>{children}</em>;
          case 'bold':
            return <strong key={node.id}>{children}</strong>;
        }
        return <></>;
      }
    },
  };

  const setStyleInSelection = (style) => {
    const selection = getSelection();
    setStyle(style, selection);
    onChange(buildContent());
  };

  return (
    <div className={`rich-textarea ${className}`}>
      <Button leftIcon="fas fa-italic" onClick={() => setStyleInSelection('italic')}></Button>
      <Button leftIcon="fas fa-bold" onClick={() => setStyleInSelection('bold')}></Button>
      <label>
        <div className="rich-textarea-label">{label}</div>
        {editor}
        <div className="line" />
      </label>
    </div>
  );
};

RichTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

RichTextArea.defaultProps = {
  className: '',
  children: '',
};

export default RichTextArea;
