import Logo from '../../lib/assets/images/logo.png';
import Button from '../../lib/components/Button';

export default function Host() {
  return (
    <div className="fixed p-4 -translate-x-1/2 -translate-y-1/2 rounded top-1/2 left-1/2 bg-bg-1">
      <Button>X</Button>
      <img src={Logo} className="w-auto" />
    </div>
  );
}
