import type { Mode } from './Index';

interface Props {
  onChangeMode: (mode: Mode) => void;
}

export default function NormalMode({ onChangeMode }: Props) {
  function switchCameraMode() {
    onChangeMode('free');
  }

  return (
    <div className="font absolute top-[50vh] left-[30vh] -translate-x-1/2 -translate-y-1/2 bg-bg-1/60 space-y-4 p-3 pl-4 pr-4 rounded-md">
      <div className="flex items-center space-x-4">
        <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
          <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">1</p>
        </div>
        <p>Switch to race points</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
          <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">2</p>
        </div>
        <p>Switch to start points</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
          <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">Z</p>
        </div>
        <p>Place a point at current position</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
          <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">X</p>
        </div>
        <p>Delete current point</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
          <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">U</p>
        </div>
        <p>Increase current race point radius</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
          <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">N</p>
        </div>
        <p>Decrease current race point radius</p>
      </div>

      <div className="flex ml-auto mr-auto text-sm">
        <button
          onClick={switchCameraMode}
          className="p-2 pl-3 pr-3 mt-4 ml-auto mr-auto transition-colors rounded-sm bg-bg-1/60 hover:bg-bg-1/70 active:bg-bg-1/90"
        >
          Switch to free camera
        </button>
      </div>
    </div>
  );
}
