import Landing from './Attributes';
import AttributeProvider from './context';

export default function Attributes() {
  return (
    <AttributeProvider>
      <Landing />
    </AttributeProvider>
  );
}
