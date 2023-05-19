import { MantineProvider } from '@mantine/core';
import './App.less'
import { Shell } from './components/shell';
import { Notifications } from '@mantine/notifications';
import { WantMore } from './components/want-more';
import { useGlobalStore } from './composerables/state';
export default function App() {
  const wantMore = useGlobalStore(state => state.wantMore);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications position="top-right"/>
      <Shell />
      { wantMore ? <WantMore /> : null}
    </MantineProvider>
  );
}