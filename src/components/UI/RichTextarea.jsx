import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';

/*
This component is the equivalent of a normal textarea, but you can write html code in it.
It is a more complex component, so we need to make a sort of class with it.
You create an instance of it by calling RichTextarea.create()
You can then use the React component by using RichTextarea.Component
*/
const RichTextarea = {
  // Component starts with an upper case C because it cannot start with a lower case letter
  // if we use function useEffect
  Component: ({ label, className, children, richTextarea }) => {
    // We need the reference because the editor should be an HTML element,
    // which we can only get when DOM is loaded.
    // When it is loaded, the function useEffect is then called, and we can get the HTML element in the ref
    const ref = React.useRef();
    const editor = (
      <div className="rich-textarea-editor" contentEditable={true} spellCheck={true} ref={ref}>
        {children}
      </div>
    );
    // Called when DOM is loaded
    useEffect(() => {
      richTextarea.editor = ref.current;
    });
    return (
      <div className={`rich-textarea ${className}`}>
        <label>
          <div className="rich-textarea-label">{label}</div>
          {editor}
          <div className="line" />
        </label>
      </div>
    );
  },

  /*
  The equivalent of the constructor.
  * onChange : callback called when the text is modified
  * onDOMStructureChanged : callback calledwhen a new element is added to the DOM
                            (either by creating a new line or removing a line)
  Returned value should not be used outside of this file.
  When a value should be read or written, you can use a getter or a setter bellow
  */
  create: (onChange, onDOMStructureChanged) => {
    /*
    editor : the html element representing the editable <div>
    content : the react element / element list representing the children of the editor
    onChange : the callback function to call when the text in the editor is changed
    */
    return { editor: undefined, content: [], onChange, onDOMStructureChanged };
  },

  /*
    Returns the content in the editor.
    If the HTML content is :
      <p>Hello World !</p>
      <p>This is <em>italic</em> style !</p>
    Then, the following object will be returned :
    [
      {
        id: 0,
        type: "container",
        parent: -1,
        children: [1],
        textLength: 13,
        startsAt: 0
      },
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
  update: (richTextarea) => {
    if (!richTextarea.editor) {
      return [];
    }
    richTextarea.content = [];
    const idAndCurrentTextLength = { id: 0, currentTextLength: 0 };
    RichTextarea.internal.updateNode(richTextarea, richTextarea.editor, -1, idAndCurrentTextLength);
  },

  getSelection: (richTextarea) => {
    const selection = window.getSelection();
    // Starts at -1 so the first <p> will be 0 (the <div> editor is -1, but we don't care about it)
    const id = { id: -1 };
    // Anchor node is the node where selection begins
    const anchorNodeId = RichTextarea.internal.findNodeId(richTextarea, selection.anchorNode);
    id.id = -1;
    // Focus node is the node where selection ends
    const focusNodeId = RichTextarea.internal.findNodeId(richTextarea, selection.focusNode);
    return {
      from: { nodeId: anchorNodeId, offset: selection.anchorOffset },
      to: { nodeId: focusNodeId, offset: selection.focusOffset },
    };
  },

  setStyle: (richTextarea, style, selection) => {
    const startNode = richTextarea.content[selection.from.nodeId];
    const endNode = richTextarea.content[selection.to.nodeId];
    const startNodeGenealogy = RichTextarea.internal.getNodeGenealogy(richTextarea, startNode);
    const endNodeGenealogy = RichTextarea.internal.getNodeGenealogy(richTextarea, endNode);
    RichTextarea.internal.getTextsBetween(richTextarea, startNodeGenealogy, endNodeGenealogy).forEach((text) => {
      RichTextarea.internal.addStyleOnText(richTextarea, style, text, 0, -1);
    });
    RichTextarea.internal.addStyleOnText(richTextarea, style, selection.from.nodeId, selection.from.offset, -1);
    RichTextarea.internal.addStyleOnText(richTextarea, style, selection.to.nodeId, 0, selection.to.offset);
  },

  buildContent: (richTextarea) => {
    return RichTextarea.internal.buildNode(
      richTextarea,
      richTextarea.content[RichTextarea.internal.findNodeId(richTextarea, richTextarea.editor)],
    );
  },

  /*
  These methods should not be used outside of this file. They are used for internal stuff.
  */
  internal: {
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
    updateNode: (richTextarea, element, parent, idAndCurrentTextLength) => {
      // Reserving this place for later (if we don't do that, child nodes will take it)
      const node = {
        id: -1,
        type: 'undefined',
        parent: parent,
        children: undefined,
        textLength: 0,
        startsAt: -1,
      };
      richTextarea.content.push(node);
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
      node.id = idAndCurrentTextLength.id++;
      node.startsAt = idAndCurrentTextLength.currentTextLength;
      node.children =
        node.type === 'text'
          ? element.data
          : Array.from(element.childNodes).map((child) =>
              RichTextarea.internal.updateNode(richTextarea, child, node.id, idAndCurrentTextLength),
            );
      node.textLength =
        node.type === 'text'
          ? node.children.length
          : node.children.reduce((prev, child) => {
              return (prev += richTextarea.content[child].textLength);
            }, 0);
      if (node.type === 'text') {
        idAndCurrentTextLength.currentTextLength += node.textLength;
      }
      return node.id;
    },

    getChildId: (richTextarea, node) => {
      return node.parent === -1
        ? 0
        : richTextarea.content[node.parent].children.findIndex((child) => child === node.id);
    },

    /*
    Used to find the id of an HTML node in our editor
    */
    findNodeId: (richTextarea, searchedNode) => {
      return richTextarea.content.find((node) => {
        const genealogy = RichTextarea.internal.getNodeGenealogy(richTextarea, node);
        let currentHTMLNode = richTextarea.editor;
        genealogy.forEach((nodeId) => {
          const childId = RichTextarea.internal.getChildId(richTextarea, richTextarea.content[nodeId]);
          currentHTMLNode = currentHTMLNode.childNodes[childId];
        });
        return currentHTMLNode === searchedNode;
      }).id;
    },

    /* Adds a style on a text node, for example italic, bold, ...
     * richTextarea : the pseudo-instance
     * id : the id of the text node we want to add a style to
     * start : where the style shoudl start to be applied
     * end : where the style should stop to be applied (not included)
     */
    addStyleOnText: (richTextarea, style, id, start, end) => {
      const node = richTextarea.content[id];
      if (end === -1) {
        end = node.children.length;
      }

      const newTextNode = {
        id: richTextarea.content.length,
        type: 'text',
        parent: node.parent,
        children: node.children.substr(start, end),
        textLength: end - start,
        startsAt: node.startsAt + start,
      };
      richTextarea.content.push(newTextNode);

      const newStyleNode = {
        id: richTextarea.content.length,
        type: style,
        parent: node.parent,
        children: [newTextNode.id],
        textLength: newTextNode.textLength,
        startsAt: newTextNode.startsAt,
      };
      richTextarea.content.push(newStyleNode);

      // Adding the new id to the parent's children array
      const parentChildren = richTextarea.content[node.parent].children;
      const childrenId = parentChildren.findIndex((child) => child === node.id);
      parentChildren.splice(childrenId + 1, 0, newStyleNode.id);
      if (end !== node.children.length) {
        const endOfText = {
          id: richTextarea.content.length,
          type: 'text',
          parent: node.parent,
          children: node.children.substr(end),
          textLength: newTextNode.textLength - end,
          startsAt: newTextNode.startsAt + end,
        };
        richTextarea.content.push(endOfText);
        parentChildren.splice(childrenId + 2, 0, endOfText.id);
      }
      if (start === 0) {
        parentChildren.splice(childrenId, 1);
      } else {
        node.children = node.children.substr(0, start);
      }
    },

    /*
    Returns the genealogy of the node. Does not include the editor (<div>), which is a parent of every node.
    The array
    */
    getNodeGenealogy: (richTextarea, node) => {
      let parent = node;
      const genealogy = [parent.id];
      while (parent.parent !== -1) {
        parent = richTextarea.content[parent.parent];
        genealogy.unshift(parent.id);
      }
      return genealogy.slice(1);
    },

    /*
    Returns true if the node which corresponds to genealogyA comes before node with genealogyB.
    Returns false otherwise.
    If they are equal or A is a parent of B, returns false
    */
    AIsBeforeB: (richTextarea, genealogyA, genealogyB) => {
      for (let i = 0; i < Math.min(genealogyA.length, genealogyB.length); i++) {
        const childIdA = RichTextarea.internal.getChildId(richTextarea, richTextarea.content[genealogyA[i]]);
        const childIdB = RichTextarea.internal.getChildId(richTextarea, richTextarea.content[genealogyB[i]]);
        if (childIdA < childIdB) {
          return true;
        } else if (childIdB < childIdA) {
          return false;
        }
      }
      return false;
    },

    /*
    This returns a list of all the text between 2 texts.
    The start and end texts are not included in the returned array.
    The texts are represented by their respective genealogies.
    */
    getTextsBetween: (richTextarea, startNodeGenealogy, endNodeGenealogy) => {
      return richTextarea.content
        .filter((node) => {
          if (node.type !== 'text') {
            return false;
          }
          const genealogy = RichTextarea.internal.getNodeGenealogy(richTextarea, node);
          return (
            RichTextarea.internal.AIsBeforeB(richTextarea, startNodeGenealogy, genealogy) &&
            RichTextarea.internal.AIsBeforeB(richTextarea, genealogy, endNodeGenealogy)
          );
        })
        .map((node) => node.id);
    },

    buildNode: (richTextarea, node) => {
      if (node.type === 'text') {
        return node.children;
      } else {
        const children = node.children.map((child) =>
          RichTextarea.internal.buildNode(richTextarea, richTextarea.content[child]),
        );
        switch (node.type) {
          case 'container':
            return <p>{children}</p>;
          case 'italic':
            return <em>{children}</em>;
          case 'bold':
            return <strong>{children}</strong>;
        }
        return <></>;
      }
    },
  },
};

RichTextarea.Component.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  richTextarea: PropTypes.shape({
    editor: PropTypes.any,
    content: PropTypes.object,
    onChange: PropTypes.func,
  }).isRequired,
};

RichTextarea.Component.defaultProps = {
  className: '',
  children: '',
};

export default RichTextarea;
