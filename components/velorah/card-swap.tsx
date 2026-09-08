'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';
import './card-swap.css';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  /**
   * Cycle the deck on a timer. When false the deck only advances when the
   * viewer clicks the front card (clicking the front card advances it either
   * way, so long as no swap is already running).
   */
  autoPlay?: boolean;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

/**
 * How far the outgoing card travels before it loops back to the rear of the
 * deck. The stock component drops it straight down (`y: '+=500'`); this exits
 * up and to the left instead, away from the stack, which recedes up-and-right.
 */
const EXIT_X = -520;
const EXIT_Y = -520;

/** Total time the promote stagger is spread across, however many cards there are. */
const PROMOTE_STAGGER_TOTAL = 0.3;

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  autoPlay = true,
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    /* Only the front card is clickable, so only it gets the pointer cursor. */
    const markFrontCard = () => {
      refs.forEach((r, idx) => {
        r.current?.classList.toggle('card--front', order.current[0] === idx);
      });
    };
    markFrontCard();

    const swap = () => {
      if (order.current.length < 2) return;

      /*
       * Land any in-flight swap before starting a new one. Without this a fast
       * second click leaves two timelines tweening the same card at once (GSAP
       * does not overwrite by default), so cards drift apart instead of moving
       * as one. progress(1) fires the pending zIndex callbacks, so every card
       * ends in a known slot before the next timeline is built.
       */
      const prev = tlRef.current;
      if (prev && prev.isActive()) prev.progress(1).kill();

      const [front, ...rest] = order.current;

      /*
       * Rotate the order now rather than at the end of the timeline. The
       * incoming card reaches the front visually about halfway through, but the
       * old code left `order` stale until the last tween finished ~3.7s in, so
       * clicks in that window hit the wrong card and were silently dropped.
       */
      order.current = [...rest, front];
      markFrontCard();

      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        x: `+=${EXIT_X}`,
        y: `+=${EXIT_Y}`,
        duration: config.durDrop,
        ease: config.ease
      });

      /*
       * Spread the promote stagger over a fixed budget instead of a flat 0.15s
       * per card. With a 12-card deck the flat step cascaded for 1.65s, so the
       * stack visibly rippled rather than advancing together.
       */
      const stagger = Math.min(0.15, PROMOTE_STAGGER_TOTAL / Math.max(rest.length - 1, 1));

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * stagger}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
    };

    const cleanups: Array<() => void> = [];

    /*
     * Click-to-advance. Bound here rather than as an onClick prop so the `order`
     * and timeline refs are read inside an effect. Only the front card responds,
     * and only when no swap is in flight — otherwise repeated clicks stack
     * overlapping timelines and desync `order`.
     */
    refs.forEach((r, idx) => {
      const el = r.current;
      if (!el) return;
      const onCardPress = () => {
        /*
         * No "is a swap running?" guard: swap() lands the previous timeline
         * first, so a click always advances the deck. The old guard ignored
         * every click for the ~3.7s the timeline ran, which read as the deck
         * randomly refusing to move.
         */
        if (order.current[0] === idx) swap();
      };
      el.addEventListener('click', onCardPress);
      cleanups.push(() => el.removeEventListener('click', onCardPress));
    });

    if (autoPlay) {
      const startCycle = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(swap, delay);
      };

      /*
       * The stock component calls swap() immediately on mount, so the first card
       * animates away before it can be read. Waiting one full `delay` first gives
       * every card — including the first — the same dwell time on screen.
       */
      const startTimeout = window.setTimeout(() => {
        swap();
        startCycle();
      }, delay);
      cleanups.push(() => {
        clearTimeout(startTimeout);
        clearInterval(intervalRef.current);
      });

      if (pauseOnHover) {
        const node = container.current!;
        const pause = () => {
          tlRef.current?.pause();
          clearTimeout(startTimeout);
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          startCycle();
        };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        cleanups.push(() => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
        });
      }
    }

    return () => cleanups.forEach(fn => fn());
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    autoPlay,
    refs,
    config.durDrop,
    config.durMove,
    config.durReturn,
    config.ease,
    config.promoteOverlap,
    config.returnDelay
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
