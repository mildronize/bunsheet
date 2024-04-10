import NxWelcome from './nx-welcome';
import { SharedUi } from '@myngapp/shared-ui';

export function App() {
  return (
    <div>
      <SharedUi />
      <NxWelcome title="myngapp" />
    </div>
  );
}

export default App;
