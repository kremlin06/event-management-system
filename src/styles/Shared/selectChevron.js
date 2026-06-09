// src/styles/Shared/selectChevron.js
// base styled div for the animated dropdown chevron arrow.
// used by SelectChevronWrap.jsx (React component) which manages open/close state.
//
// WHY REACT STATE INSTEAD OF :focus-within:
//   :focus-within keeps the arrow pointed UP as long as the <select> is focused.
//   after the user picks an option, native <select> retains focus — so the arrow
//   never rotates back down until they click elsewhere. that's the "stuck" bug.
//   using React state + onFocus / onChange / onBlur gives us exact control:
//     onFocus  → open (arrow UP)
//     onChange → close (arrow DOWN — option was selected)
//     onBlur   → close (arrow DOWN — user clicked away without selecting)
//
// WHY translateY(-50%) rotate(X) INSTEAD OF SEPARATE top VALUES:
//   the old approach set different top values for up vs down state. this caused
//   the arrow to visually jump vertically when rotating. using translateY(-50%)
//   as part of the transform keeps the chevron pinned to the exact vertical
//   center for BOTH rotation states — the position never changes.

import styled from 'styled-components';

// ChevronOuter is the base styled div.
// it renders the ::after chevron and rotates it based on the $open prop.
// it is NOT used directly in JSX — use SelectChevronWrap (which manages $open)
// or a layout wrapper that extends this (e.g. styled(SelectChevronWrap)).
export const ChevronOuter = styled.div`
  position: relative;  /* ::after positions relative to this element */

  &::after {
    content: '';
    position: absolute;
    right: 12px;

    /* top: 50% + translateY(-50%) = perfectly centered vertically.
       this is the correct way to center a pseudo-element because the percentage
       in translateY is relative to the element itself, not the parent.
       result: the arrow stays at the same vertical position for both states. */
    top: 50%;

    width: 8px;
    height: 8px;

    /* two borders form the L-shape that, when rotated, looks like a chevron.
       border-right + border-bottom at 45deg = "∨" (down)
       border-right + border-bottom at -135deg = "∧" (up) */
    border-right: 2px solid ${({ theme }) => theme.colors.textTertiary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.textTertiary};

    /* pointer-events: none means clicking the arrow area still hits the select */
    pointer-events: none;

    /* translateY(-50%) centers the box, then rotate() turns it.
       we combine both in one transform so they apply as a single operation —
       no position jumping between open and closed states. */
    transform: translateY(-50%) rotate(${({ $open }) => $open ? '-135deg' : '45deg'});

    /* ease-in-out = starts slow, accelerates, slows at end — feels natural */
    transition: transform 0.25s ease-in-out;
  }
`;
