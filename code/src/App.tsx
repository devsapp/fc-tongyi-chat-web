import { MantineProvider } from '@mantine/core';
import './App.less'
import { Shell } from './components/shell';
import { Notifications } from '@mantine/notifications';
export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications position="top-right"/>
      <Shell />
    </MantineProvider>
  );
}