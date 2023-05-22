import { MantineProvider } from '@mantine/core';
import './App.less'
import { Shell } from './components/shell';
import { Notifications } from '@mantine/notifications';
import { WantMore } from './components/want-more';
import { useGlobalStore } from './composerables/state';
import Watermark from 'watermark-plus';
import { useEffect } from 'react';

export default function App() {
  const wantMore = useGlobalStore(state => state.wantMore);
  const user = useGlobalStore(state => state.user);
  useEffect(
    () => {
      const watermark = new Watermark({
        // 传参
        content: user?.uid,
      });
      
      // 创建水印
      watermark.create();
      return () => watermark.destroy();
    },
  [user]
  )
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications position="top-right"/>
      <Shell />
      { wantMore ? <WantMore /> : null}
    </MantineProvider>
  );
}