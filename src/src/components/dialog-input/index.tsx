import './index.less'
import { Box, Select, Button } from '@mantine/core';
import { useState } from 'react'
import { useGlobalStore } from '../../composerables/state';
import { chat } from '../../api';
import { TONGYI_UID } from '../../config/constant';
import { error } from '../../utils/notification';
export function DialogInput(props: { scrollToBottom: () => any }) {
    const setLoading = useGlobalStore(state => state.setLoading);
    const loading = useGlobalStore(state => state.loading);
    const user = useGlobalStore(state => state.user);
    const appendConversation = useGlobalStore(state => state.appendConversation);
    const builtinPrompts = useGlobalStore(state => state.builtinPrompts);
    const currentTask = useGlobalStore(state => state.currentTask);
    const data = builtinPrompts[currentTask.id]?.map(p => ({ label: p.content, value: p.content })) ?? [];
    // console.log('data', builtinPrompts[currentTask.id]?.map(p => ({ label: p.content, value: p.content })))
    const [prompt, setPrompt] = useState<string | null>(null);
    const send = async () => {
        if (!prompt) return ;
        setPrompt(null)
        setLoading(true)
        try {
            appendConversation(prompt, user.uid )
            props.scrollToBottom();
            const result = await chat({ prompt, uid: user.uid })
            appendConversation(result.data?.output?.text, TONGYI_UID )
            props.scrollToBottom();
        } catch(e) {
            error({ title: '出错了', message: '网络异常' })
            setLoading(false)
        }
        setLoading(false)
    }
    return (
        <Box className='dialog-input'>
            <Select
                className='dialog-input-select'
                data={data}
                placeholder="选择或输入你的问题"
                nothingFound="Nothing found"
                searchable
                creatable
                clearable
                w={'100%'}
                value={prompt}
                getCreateLabel={(query) => `+ 自由输入： ${query}`}
                onChange={(value) => setPrompt(value)}
                // onCreate={(query) => {
                //     const item = { value: query, label: query };
                //     setData((current) => [...current, item]);
                //     return item;
                // }}
            />
            <Button className='dialog-input-button' onClick={send} disabled={loading}>
                {
                    loading ? '处理中...' : '立即发送'
                }
            </Button>
        </Box>
    )
}