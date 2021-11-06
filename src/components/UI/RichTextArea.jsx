import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '.';

/**
 * A {@link RichTextArea} is the equivalent of a regular textarea to the difference
 * that you can add html elements in it so that text can be styled.
 */
const RichTextArea = ({ label, className, children, onChange }) => {
  /** @type {RichTextAreaNode[]} */
  let content = [];
  const ref = useRef();
  const reactFeedback = useRef(false);

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

  useEffect(() => {
    const observer = new MutationObserver((mutations, observer) => {
      // If we trigger a manual React update, we must not execute the callback
      if (reactFeedback.current) return (reactFeedback.current = false);

      // Update computed content
      updateTreeView();

      // Find cursor position
      const selection = window.getSelection();
      const userSelection =
        ref.current.contains(selection.anchorNode) && ref.current.contains(selection.focusNode)
          ? computeSelectionPosition(selection.anchorNode, selection.anchorOffset)
          : {
              position: 0,
              line: 0,
            };

      for (const mutation of mutations.reverse())
        if (mutation.type === 'childList') {
          // Revert all changes as React will handle them
          for (const addedNode of mutation.addedNodes) addedNode.remove();

          // Restore removed nodes to allow React to remove them (because he feels very easily offended)
          for (const removedNode of mutation.removedNodes)
            if (mutation.nextSibling && mutation.nextSibling.parentNode)
              mutation.target.insertBefore(removedNode, mutation.nextSibling);
            else if (mutation.previousSibling && mutation.previousSibling.parentNode)
              mutation.previousSibling.after(removedNode);
            else mutation.target.prepend(removedNode);
        }

      // If the user added text with no parent, wrap it into a <p> element
      const rootTextNodes = content.filter((node) => node.parent < 0 && node.type === 'text');
      for (const rootTextNode of rootTextNodes)
        rootTextNode.parent =
          content.push({
            id: content.length,
            children: [rootTextNode.id],
            parent: -1,
            type: 'container',
            textLength: rootTextNode.textLength,
            startsAt: rootTextNode.startsAt,
          }) - 1;

      // Flat content (ie. merge siblings that should be merged)
      content.filter((node) => node.parent < 0).forEach(flatten);

      // Wake up React, we need you for once !
      onChange(buildContent());

      // Clear observer records as we don't want React updates to trigger this callback
      observer.takeRecords();

      // Replace user selection at proper position
      if (selection && userSelection) setCursorPosition(selection, userSelection.position, userSelection.line);
    });

    // Start watching for DOM updates
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    });

    // Release observer when Component is destroyed
    return () => observer.disconnect();
  }, []);

  /**
   * A Node computed by a {@link RichTextArea} when applying styles on
   * a part of its content. The `id` property of a {@link RichTextAreaNode}
   * reflects its index in the {@link content} of the {@link RichTextArea}.
   * @typedef {{
   *  id: number;
   *  type: 'text';
   *  parent: number;
   *  children: string;
   *  textLength: number;
   *  startsAt: number;
   * } & {
   *  id: number;
   *  type: string;
   *  parent: number;
   *  children: number[];
   *  textLength: number;
   *  startsAt: number;
   * }} RichTextAreaNode
   */

  /**
   * The binding of a user {@link Selection} as returned by {@link window.getSelection}
   * @typedef {{
   *  from: { nodeId: number; offset: number; };
   *  to: { nodeId: number; offset: number; };
   * }} RichTextAreaSelection
   */

  /**
   * Updates the computed {@link content} of the {@link RichTextArea}.
   * The {@link content} property is used when applying styles on a part
   * of the input.
   */
  const updateTreeView = () => {
    content = [];
    if (!!ref.current) updateTreeViewNode(ref.current, -1);
  };

  /**
   * Updates a part of {@link content}. This function should only be called by {@link updateTreeView}.
   * @param {Node} parentNode the node to retrieve children from
   * @param {number} parentId the id of the node to retrieve children from
   * @param {{currentId: number; cumulativeLength: number;}} cascadedData data including last id used and consumed string length
   * @returns {number[]} an list of the children of the {@link parent}, mapped by their id
   */
  const updateTreeViewNode = (parentNode, parentId, cascadedData = { currentId: 0, cumulativeLength: 0 }) =>
    Array.from(parentNode.childNodes).map((element) => {
      // Reserving this place for later (if we don't do that, child nodes will take it)
      /** @type {RichTextAreaNode} */
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
      node.children = node.type === 'text' ? element.data : updateTreeViewNode(element, node.id, cascadedData);
      node.textLength =
        node.type === 'text'
          ? node.children.length
          : node.children.reduce((prev, child) => prev + content[child].textLength, 0);
      if (node.type === 'text') cascadedData.cumulativeLength += node.textLength;
      return node.id;
    });

  /**
   * Retrieves the current position of the user selection
   * @returns {RichTextAreaSelection} the id of the node contained in {@link content},
   * enclosing the current user selection (along with the position of the selection bounds in these nodes)
   */
  const getSelection = () => {
    const selection = window.getSelection();
    if (!ref.current.contains(selection.anchorNode) || !ref.current.contains(selection.focusNode)) return;

    // Update computed node positions
    updateTreeView();
    // Anchor node is the node where selection begins
    const anchorNodeId = findNodeId(selection.anchorNode);
    // Focus node is the node where selection ends
    const focusNodeId = findNodeId(selection.focusNode);
    const result = {};
    const anchorNodePosition = { nodeId: anchorNodeId, offset: selection.anchorOffset };
    const focusNodePosition = { nodeId: focusNodeId, offset: selection.focusOffset };
    if (anchorNodeId === focusNodeId) {
      if (selection.anchorOffset <= selection.focusOffset) {
        result.from = anchorNodePosition;
        result.to = focusNodePosition;
      } else {
        result.from = focusNodePosition;
        result.to = anchorNodePosition;
      }
    } else if (content[anchorNodeId].startsAt < content[focusNodeId].startsAt) {
      result.from = anchorNodePosition;
      result.to = focusNodePosition;
    } else {
      result.from = focusNodePosition;
      result.to = anchorNodePosition;
    }
    return result;
  };

  /**
   * Retrieves the index of the node in its parent children
   * @param {RichTextAreaNode} node the node to lookup
   * @returns {number} the index/id of parent of the {@link node}
   */
  const getChildId = (node) =>
    node.parent === -1
      ? content.filter((node) => node.parent === -1).indexOf(node)
      : content[node.parent].children.indexOf(node.id);

  /**
   * Finds the id of an HTML node in our {@link RichTextArea}
   * @param {ChildNode} searchedNode the HTML {@link Node} we are looking for
   * @returns {number} the id of the corresponding {@link RichTextAreaNode}
   */
  const findNodeId = (searchedNode) => {
    return content.find((node) => {
      const genealogy = getNodeGenealogy(node);
      let currentHTMLNode = ref.current;
      genealogy.forEach((nodeId) => {
        const childId = getChildId(content[nodeId]);
        currentHTMLNode = currentHTMLNode.childNodes[childId];
      });
      return currentHTMLNode === searchedNode;
    })?.id;
  };

  /**
   * Retrieves the siblings of the targeted {@link node}
   * @param {RichTextAreaNode} node the node to retrieves siblings of
   * @returns {number[]} the id of the siblings of the {@link node}
   */
  const getSiblings = (node) => {
    return node.parent === -1 ? content.filter((n) => n.parent === -1).map((n) => n.id) : content[node.parent].children;
  };

  /**
   * Returns the genealogy of the node. Does not include the editor (&lt;div&gt;), which is a parent of every node.
   * @param {RichTextAreaNode} node the node to lookup
   * @returns {number[]} the list containing the id of all ancestors of the {@link node}, from top to bottom
   */
  const getNodeGenealogy = (node) => {
    let parent = node;
    const genealogy = [parent.id];
    while (parent.parent !== -1) {
      parent = content[parent.parent];
      genealogy.unshift(parent.id);
    }
    return genealogy;
  };

  /**
   * Applies style (eg. italic or bold) on a selection (within the content of the textarea)
   * @param {string} style the style to apply on the {@link selection}
   * @param {RichTextAreaSelection} selection the char selection to apply {@link style} on.
   */
  const setStyle = (style, selection) => {
    const startNode = content[selection.from.nodeId];
    const endNode = content[selection.to.nodeId];
    if (startNode === endNode) {
      // Prevent from styling the same tag twice with this check
      addStyleOnText(style, startNode, selection.from.offset, selection.to.offset);
    } else {
      getTextsBetween(startNode, endNode).forEach((text) => addStyleOnText(style, text, 0, -1));
      addStyleOnText(style, startNode, selection.from.offset, -1);
      addStyleOnText(style, endNode, 0, selection.to.offset);
    }
  };

  /**
   * Adds a style on a text node
   * @param {string} style the style to apply on text (eg. italic or bold)
   * @param {RichTextAreaNode} node the node apply the {@link style} on
   * @param {number} start the position in the {@link node} where style should start (inclusive)
   * @param {number} end the position in the {@link node} where style should end (exclusive)
   */
  const addStyleOnText = (style, node, start, end) => {
    if (end === -1) {
      end = node.children.length;
    }

    let parent = node.parent;
    while (parent !== -1) {
      if (content[parent].type === style) {
        return;
      }
      parent = content[parent].parent;
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
    const siblings = getSiblings(node);
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
  };

  /**
   * Retrieves a list of all the text between 2 texts.
   * @param {RichTextAreaNode} startNode the node to start lookup from
   * @param {RichTextAreaNode} endNode the node where the search should end
   * @returns {RichTextAreaNode[]} the text nodes contained
   * in the {@link RichTextArea} between the {@link startNode} and the {@link endNode}
   */
  const getTextsBetween = (startNode, endNode) =>
    content.filter(
      (node) =>
        node.type === 'text' &&
        startNode.startsAt < node.startsAt &&
        endNode.startsAt + endNode.textLength > node.startsAt + node.textLength,
    );

  /**
   * Computes the position of the cursor
   * @param {Node} domNode the node to look for
   * @param {number} offset the offset of the selection in the {@link node}
   * @returns {{ position: number; line: number; }} the selection position
   */
  const computeSelectionPosition = (domNode, offset) => {
    // At first, compute paragraph position
    let line = 0;
    for (let i = 0; i < ref.current.childNodes.length; i++) {
      const child = ref.current.childNodes[i];
      if (child.contains(domNode)) {
        line = i;
        break;
      }
    }

    // Now let's compute the cursor text position
    const node = content[findNodeId(domNode)];
    if (!node)
      return {
        position: 0,
        line: 0,
      };
    if (node.type === 'container') {
      const child = content[node.children[offset]];
      return { position: (child ?? node).startsAt + (child ?? node).textLength, line };
    }
    return { position: node.startsAt + offset, line };
  };

  /**
   * Places the cursor at the chosen position
   * @param {Selection} selection the initial user {@link Selection}
   * @param {number} position the position of the cursor in the text
   * @param {number} line the number of the line selected by the cursor
   */
  const setCursorPosition = (selection, position, line) => {
    const range = document.createRange();
    let cursor = content.filter((node) => node.parent < 0 && node.type === 'container')[line]?.startsAt ?? 0;
    const findNode = (parent) => {
      const elem = {
        node: parent,
        found: false,
      };
      for (const child of parent.childNodes) {
        if (child.nodeName === '#text') {
          if (cursor + child.length >= position) return { node: child, found: true };
          cursor += child.length;
        } else {
          const finds = findNode(child);
          if (finds.found) return finds;
        }
        elem.node = child;
      }
      return elem;
    };
    const lineNode = ref.current.childNodes[line];
    const { node: targetNode } = lineNode ? findNode(lineNode) : { node: ref.current };
    range.setStart(targetNode, position - cursor);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  /**
   * Flattens node hierarchy (recursively)
   * @param {RichTextAreaNode} node the node to flatten
   */
  const flatten = (node) => {
    if (Array.isArray(node.children)) {
      node.children = node.children.reduce((flattened, next) => {
        const currentSigbling = content[next];
        if (!flattened.length) {
          flatten(currentSigbling);
          return [next];
        }
        const previousSibling = content[flattened[flattened.length - 1]];
        if (previousSibling.type !== currentSigbling.type) {
          flatten(currentSigbling);
          return [...flattened, next];
        }
        previousSibling.textLength += currentSigbling.textLength;
        if (typeof previousSibling.children === 'string') previousSibling.children += currentSigbling.children;
        else previousSibling.children = [...previousSibling.children, ...currentSigbling.children];
        flatten(previousSibling);
        return flattened;
      }, []);
    }
  };

  /**
   * Builds the content of the {@link RichTextArea} into react elements.
   * @returns {JSX.Element} a react HTML Element to replace the old content of the {@link RichTextArea}
   */
  const buildContent = () => content.filter((element) => element.parent === -1).map(buildNode);

  /**
   * Builds a single node (contained in {@link content}) into a react HTML Element.
   * @param {RichTextAreaNode} node the node to build into a react element
   * @returns {JSX.Element | string} a react HTML Element containing the whole {@link node}
   */
  const buildNode = (node) => {
    if (node.type === 'text') {
      return node.children;
    } else {
      const children = node.children.map((child) => buildNode(content[child]));
      switch (node.type) {
        case 'container':
          return (
            <p key={node.id}>
              {children}
              <br />
            </p>
          );
        case 'italic':
          return <em key={node.id}>{children}</em>;
        case 'bold':
          return <strong key={node.id}>{children}</strong>;
      }
      return <></>;
    }
  };

  /**
   * Applies style to the current user selection
   * @param {string} style the style to apply
   * @see {@link addStyleOnText}
   */
  const setStyleInSelection = (style) => {
    const selection = getSelection();
    if (!selection) return;
    setStyle(style, selection);
    reactFeedback.current = true;
    onChange(buildContent());
  };

  return (
    <div className={`rich-textarea ${className}`}>
      <div className="rich-textarea-label">{label}</div>
      <div className="wrapper">
        <div className="header">
          <Button leftIcon="fas fa-bold" onClick={() => setStyleInSelection('bold')}></Button>
          <Button leftIcon="fas fa-italic" onClick={() => setStyleInSelection('italic')}></Button>
        </div>
        {editor}
      </div>
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
