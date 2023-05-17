import './index.less';
import { ScrollArea, Alert, Stack } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { Conversation } from '../conversation';
import { useGlobalStore } from '../../composerables/state';
import { DialogInput } from '../dialog-input'
import { useRef } from 'react'


export function Chatbox() {
    const special = useGlobalStore(state => state.special);
    const config = useGlobalStore(state => state.config);
    const history = useGlobalStore(state => state.history);
    const viewport = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        const positionToScroll = (viewport as any).current?.scrollHeight - 30;
        setTimeout(() => viewport?.current?.scrollTo({ top: positionToScroll, behavior: 'smooth' }), 200)
    }

    return (
        <div className='chatbox-wrap'>
        <ScrollArea className="chatbox" viewportRef={viewport}>
            <div className="chatbox-alert">
                {
                    config?.freeCapacity ? 
                    <Alert className='chatbox-alert-tip' icon={<IconAlertCircle size="1rem" />} color="gray">

                                <span style={{'color': '#777'}}>{ special ? `本页面仅限模拟体验，您可以部署自己的通义千问机器人` : `每个阿里云账号拥有${config?.freeCapacity}次通义千问调用额度`} </span>
                    </Alert>
                    :
                    null
                }
            </div>
            <Stack className='chatbox-history' spacing="lg" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white })}>
                {
                    history.map(
                        item => <Conversation key={item.id} item={item}/>
                    )
                }
            </Stack>
        </ScrollArea>
        <DialogInput scrollToBottom={scrollToBottom}></DialogInput>
        </div>
    )
}