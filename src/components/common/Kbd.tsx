type KbdProps = {
  kbdText: string;
};

const Kbd: React.FC<KbdProps> = ({ kbdText }) => {
  return (
    <div className='space-x-1'>
      <span className='sr-only'>Keyboard shortcut is,</span>
      <kbd className='inline-block px-1 py-0.5 bg-background/10'>{kbdText}</kbd>
    </div>
  );
};

export default Kbd;
