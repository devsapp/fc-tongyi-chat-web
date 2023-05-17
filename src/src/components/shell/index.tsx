import { AppShell, Header } from '@mantine/core';
import './index.less';
import { Nav } from '../navbar';
import { Chatbox } from '../chatbox';
import { useGlobalStore } from '../../composerables/state';

export function Shell() {
  const special = useGlobalStore(state => state.special);
  return (
    <AppShell
      className='app-shell'
      padding="md"
      navbar={<Nav></Nav>}
      header={
        special ? void 0 :
        (<>
          <Header className="header" height={100} lh="100px" fz="30px">
            <span className='title'>{'快速体验'}</span>
            <span className="subtitle">
              在线体验通义千问
            </span>
          </Header>
        </>)
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white },
      })}
    >
      <Chatbox />
    </AppShell>
  );
}