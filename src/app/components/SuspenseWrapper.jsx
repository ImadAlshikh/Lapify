import { Suspense } from "react";

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
