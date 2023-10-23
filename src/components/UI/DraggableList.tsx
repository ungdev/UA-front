'use client';
import { useEffect, useRef, useCallback, useState, ReactNode } from 'react';
/* eslint-disable import/named */
import { useSprings, animated } from '@react-spring/web';
import styles from './DraggableList.module.scss';

// -----------------------------------
//          Utility functions
// -----------------------------------

const isInside = (
  element: HTMLElement,
  coordinate: {
    left: number;
    right?: number;
    top: number;
    bottom?: number;
  },
) => {
  const { left, right, bottom, top } = element.getBoundingClientRect();
  // if bottom and right not exist then it's a point
  if (!coordinate.right || !coordinate.bottom) {
    if (coordinate.left > right || coordinate.left < left) {
      return false;
    }

    if (coordinate.top > bottom || coordinate.top < top) {
      return false;
    }
  } else {
    if (coordinate.left < left || coordinate.top < top || coordinate.right > right || coordinate.bottom > bottom) {
      return false;
    }
  }

  return true;
};

const useDraggable = ({ parentRef, onReorder }: { parentRef: React.RefObject<HTMLElement>; onReorder: () => void }) => {
  const [coordinate, setCoordinate] = useState({
    block: { x: 0, y: 0 },
    blockInitial: { x: 0, y: 0 },
    initial: { x: 0, y: 0 },
    movingBlockIndex: null,
  });

  const handleMouseUp = useCallback(() => {
    setCoordinate((prev) => ({
      ...prev,
      movingBlockIndex: null,
    }));
    onReorder();
    // removing the dragging class after 150ms
    setTimeout(() => {
      parentRef.current?.classList.remove('dragging');
    }, 150);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (coordinate.movingBlockIndex === null) {
        return;
      }
      const coordinates = { x: event.clientX, y: event.clientY };

      if (
        parentRef.current &&
        !isInside(parentRef.current, {
          left: coordinates.x,
          top: coordinates.y,
        })
      ) {
        handleMouseUp();
        return;
      }
      setCoordinate((prev) => {
        const diff = {
          x: coordinates.x - prev.initial.x,
          y: coordinates.y - prev.initial.y,
        };
        return {
          ...prev,
          block: {
            x: prev.blockInitial.x + diff.x,
            y: prev.blockInitial.y + diff.y,
          },
        };
      });
    },
    [coordinate, parentRef, handleMouseUp],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, block: { x: number; y: number }, index: number) => {
      const startingCoordinates = { x: event.clientX, y: event.clientY };
      setCoordinate((prev: any) => ({
        ...prev,
        block,
        blockInitial: block,
        initial: startingCoordinates,
        movingBlockIndex: index,
      }));
      event.stopPropagation();
      parentRef.current?.classList.add('dragging');
    },
    [],
  );

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    block: coordinate.block,
    movingBlockIndex: coordinate.movingBlockIndex,
  };
};

const DraggableList = ({
  items,
  availableWidth,
  blockWidth,
  blockHeight,
  blockGap,
  onReorder,
}: {
  /** Items to display */
  items: ReactNode[];
  /** Available width */
  availableWidth: number;
  /** Block width */
  blockWidth: number;
  /** Block height */
  blockHeight: number;
  /** Block gap */
  blockGap: number;
  /** On reorder */
  onReorder?: (newOrder: number[]) => void;
}) => {
  // -----------------------------------
  //             Constants
  // -----------------------------------
  const padding = availableWidth < 800 ? 4 : 50;
  const blockInRow = Math.floor((availableWidth - 2 * padding) / (blockWidth + blockGap));

  const [doNotRender, setDoNotRender] = useState(false);
  const [blockCount, setBlockCount] = useState(items.length);

  const parentRef = useRef(null);
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    movingBlockIndex,
    block: movingBlock,
  } = useDraggable({
    parentRef,
    onReorder: () => {
      if (onReorder) {
        onReorder(blocks.current);
      }
    },
  });

  const immediateMotionsProps = {
    x: true,
    y: true,
  };

  const blocks = useRef(new Array(blockCount).fill(0).map((_, i) => i));

  const initialCoordinates = useRef(
    blocks.current.map((index) => {
      const col = Math.floor(index % blockInRow);
      const row = Math.floor(index / blockInRow);
      return { x: col * blockWidth + col * blockGap, y: blockHeight * row + row * blockGap };
    }),
  );

  const animate = useCallback(
    (index: number) => {
      // the index in order of id
      const blockIndex = blocks.current.indexOf(index);
      // the block coordinates of other blocks
      const blockCoordinate = initialCoordinates.current[blockIndex];

      return {
        x: index === movingBlockIndex ? movingBlock.x : blockCoordinate.x,
        y: index === movingBlockIndex ? movingBlock.y : blockCoordinate.y,
        scale: index === movingBlockIndex ? 1.2 : 1,
        zIndex: index === movingBlockIndex ? 10 : 1,
        immediate:
          movingBlockIndex === index
            ? (n: any) => immediateMotionsProps[n as keyof typeof immediateMotionsProps]
            : undefined,
      };
    },
    [movingBlock, initialCoordinates, movingBlockIndex],
  );

  const [springs, api] = useSprings(blocks.current.length, animate);

  useEffect(() => {
    setDoNotRender(items.length === 0 || availableWidth === 0);
    setBlockCount(items.length);

    // we will save the actual id/index in movingBlockIndex
    const oldPosition = blocks.current.indexOf(movingBlockIndex!);
    if (oldPosition !== -1) {
      // coordinate travelled by the block from it's last position
      const coordinatesMoved = {
        // remember the grid generator function above ?
        // I created an array "initialCoordinates" using it for quick access
        x: movingBlock.x - initialCoordinates.current[oldPosition].x,
        y: movingBlock.y - initialCoordinates.current[oldPosition].y,
      };

      // As we have width and height constant, for every block movement
      // in y direction we are actually moving 3 block in row.
      // we are ignoring the padding here, as its impact is so less
      // that you will not even notice
      let y = Math.round(coordinatesMoved.y / blockHeight);
      if (Math.abs(y) > 0.5) {
        y = y * blockInRow;
      }

      const x = Math.round(coordinatesMoved.x / blockWidth);

      const newPosition = y + x + oldPosition;
      // there will be cases when block is not moved enough
      if (newPosition !== oldPosition) {
        const newOrder = [...blocks.current];
        // swaping
        const [toBeMoved] = newOrder.splice(oldPosition, 1);
        newOrder.splice(newPosition, 0, toBeMoved);
        blocks.current = newOrder;
      }
    }

    // telling the spring to animate again
    api.start(animate);
  }, [api, animate, initialCoordinates, movingBlock, movingBlockIndex, doNotRender]);

  //if(doNotRender) return false;

  return (
    <div className={styles.blockContainer} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        className={styles.wrapper}
        ref={parentRef}
        style={{
          width: blockInRow * blockWidth + (blockInRow - 1) * blockGap + padding * 2,
          height:
            blockHeight * Math.ceil(blockCount / blockInRow) +
            blockGap * (Math.ceil(blockCount / blockInRow) - 1) +
            padding * 2,
          padding: padding,
        }}>
        {springs.map((style, index) => {
          const blockIndex = blocks.current.indexOf(index);
          return (
            <animated.div
              key={index}
              className={styles.block}
              style={
                {
                  ...style,
                  width: blockWidth,
                  height: blockHeight,
                  marginBottom: blockGap,
                  marginRight: blockGap,
                } as React.StyleHTMLAttributes<HTMLDivElement>
              }
              onMouseDown={(e: any) => handleMouseDown(e, initialCoordinates.current[blockIndex], index)}>
              {items[index]}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default DraggableList;
