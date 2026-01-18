import { useState } from 'react';

export default function ASZFModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>ÁSZF</button>
      {open && (
        <div className="modal">
          <h3>Terms & Conditions</h3>
          <p>This platform offers speculative, non-binding pre-emptive rights. No property ownership is granted under current law.</p>
        </div>
      )}
    </>
  );
}
