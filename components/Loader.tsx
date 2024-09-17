import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex size-full h-screen items-center justify-center gap-3 text-slate-500">
      <Image
        src="/assets/icons/load.png"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading ...
    </div>
  );
};

export default Loader;