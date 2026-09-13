import {ReactNode} from 'react';

export default function Sections({children}: {children: ReactNode}) {
  return (
    <div className="[box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] overflow-hidden [&>_.title]:cursor-pointer">
      {children}
    </div>
  );
}
