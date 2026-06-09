// src/components/Shared/SelectChevronWrap.jsx
// React wrapper that manages the open/close state for the animated chevron arrow.
//
// USAGE:
//   wrap any <select> in this component and the arrow animates automatically.
//   you can also create pre-styled versions with extra layout CSS:
//
//     import SelectChevronWrap from '@components/Shared/SelectChevronWrap';
//     export const SelectorSelectWrap = styled(SelectChevronWrap)`flex: 1; min-width: 160px;`;
//
//   then <S.SelectorSelectWrap> in JSX — no extra state or event handlers needed.
//
// WHY THREE EVENTS:
//   onFocus  → dropdown about to open  → rotate arrow UP
//   onChange → user selected an option → rotate arrow DOWN immediately
//   onBlur   → user clicked away (ESC or outside click) → rotate arrow DOWN
//
//   onChange is the key one the CSS :focus-within approach missed. native <select>
//   retains focus after an option is selected, so :focus-within never deactivated.
//   catching onChange lets us rotate the arrow down the moment selection happens.

import { useState, useCallback } from 'react';
import { ChevronOuter } from '../../styles/Shared/selectChevron';

// useState() — React hook that gives us a state variable + setter.
// syntax: const [value, setValue] = useState(initialValue)
// when setValue is called, React re-renders the component with the new value.
// 'open' starts as false (arrow points DOWN = dropdown is closed).
const SelectChevronWrap = ({ children, className, style, ...rest }) => {
  const [open, setOpen] = useState(false);

  // useCallback() — memoizes the function so it doesn't get re-created on
  // every render. this is a small optimisation — without it the function would
  // be a new reference each render, which can cause unnecessary re-renders of
  // child components. the [] dependency array means "never recreate this".
  const handleFocus  = useCallback(() => setOpen(true),  []);
  const handleChange = useCallback(() => setOpen(false), []);
  const handleBlur   = useCallback(() => setOpen(false), []);

  return (
    // ChevronOuter is the styled div that draws the ::after chevron.
    // $open controls the rotate() degree in its CSS.
    // className + style are forwarded so styled(SelectChevronWrap)` ... `
    // can inject layout CSS (flex, min-width, etc.) from the parent.
    // onFocus / onChange / onBlur bubble up from the <select> inside via
    // React's synthetic event system — no need to attach them directly on
    // the select element.
    <ChevronOuter
      $open={open}
      className={className}
      style={style}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      {...rest}
    >
      {children}
    </ChevronOuter>
  );
};

export default SelectChevronWrap;
