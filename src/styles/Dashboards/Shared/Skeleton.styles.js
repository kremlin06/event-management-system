import styled, { keyframes } from 'styled-components';

// shimmer sweep: translucent highlight moves left → right over a muted base
const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

// base for all skeleton shapes
const SkeletonBase = styled.span`
  display: block;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgTertiary} 25%,
    ${({ theme }) => theme.colors.bgHover}    50%,
    ${({ theme }) => theme.colors.bgTertiary} 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

// single-line skeleton — mimics a text line; height defaults to 14px
// $flex — optional; pass e.g. $flex="1" when inside a flex row (e.g. chart axis labels)
export const SkeletonLine = styled(SkeletonBase)`
  height: ${({ $h }) => $h || '14px'};
  width: ${({ $w }) => $w  || '100%'};
  margin-bottom: ${({ $mb }) => $mb || '8px'};
  ${({ $flex }) => $flex && `flex: ${$flex};`}
`;

// block skeleton — for chart areas, card placeholders, images
export const SkeletonBlock = styled(SkeletonBase)`
  height: ${({ $h }) => $h || '120px'};
  width: ${({ $w }) => $w  || '100%'};
  border-radius: ${({ $r }) => $r || '8px'};
`;

// thin circle — for avatar placeholders
export const SkeletonCircle = styled(SkeletonBase)`
  width: ${({ $size }) => $size || '36px'};
  height: ${({ $size }) => $size || '36px'};
  border-radius: 50%;
  flex-shrink: 0;
`;
