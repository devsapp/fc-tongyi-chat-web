import './index.less'
import { Box, Select, Button } from '@mantine/core';
import { useState } from 'react'
import { useGlobalStore } from '../../composerables/state';
import { chat } from '../../api';
import { TONGYI_UID } from '../../config/constant';
import _ from 'lodash';
import { error } from '../../utils/notification';
// import { refreshRemainTimes } from '../../utils/action';
// import { error } from '../../utils/notification';
export function DialogInput(props: { scrollToBottom: () => any }) {
    const special = useGlobalStore(state => state.special);
    // const wantMore = useGlobalStore(state => state.wantMore);
    const remainTimes = useGlobalStore(state => state.remainTimes);
    const setLoading = useGlobalStore(state => state.setLoading);
    const loading = useGlobalStore(state => state.loading);
    const user = useGlobalStore(state => state.user);
    const updateWantMore = useGlobalStore(state => state.updateWantMore);
    const reduceRemainTimes = useGlobalStore(state => state.reduceRemainTimes);
    const appendLoadingConversation = useGlobalStore(state => state.appendLoadingConversation);
    const appendConversation = useGlobalStore(state => state.appendConversation);
    const builtinPrompts = useGlobalStore(state => state.builtinPrompts);
    const currentTask = useGlobalStore(state => state.currentTask);
    const data = builtinPrompts[currentTask.id]?.map(p => ({ label: p.content, value: p.id })) ?? [];
    // console.log('data', builtinPrompts[currentTask.id]?.map(p => ({ label: p.content, value: p.content })))
    const [prompt, setPrompt] = useState<{ content: string; id?: string; } | null>(null);
    const send = async () => {
        // if (prompt?.content?.length === 0 && !prompt?.id) return ;

        if (_.isEmpty(_.trim(prompt?.content)) === true && !prompt?.id) {
            return error({ title: '内容为空', message: '请输入正确的内容' });
        }

        setPrompt({ content: '' })
        setLoading(true)
        try {
            appendConversation(prompt?.content, user.uid )
            appendLoadingConversation()
            props.scrollToBottom();
            const result = await chat({ prompt: prompt?.content, promptId: prompt?.id, uid: user.uid })
            appendConversation(result.data?.output?.text, TONGYI_UID )
            props.scrollToBottom();
            reduceRemainTimes();
        } catch(e) {
            // error({ title: '出错了', message: '网络异常' })
            console.error('network error', e);
            // appendFailedConversation();
            setLoading(false)
        }
        setLoading(false)
        // refreshRemainTimes()
    }

    const showMore = () => {
        updateWantMore(true);
    }
    return (
        <Box className='dialog-input'>
            {/* {
                loading ? <span className='dialog-input-loading'>AI正在思考中...</span> : null
            } */}
            <Select
                className='dialog-input-select'
                data={data}
                placeholder={ special ? "请选择你的问题" : "请选择或输入你的问题"}
                nothingFound="Nothing found"
                searchable={!special}
                creatable={!special}
                clearable
                w={'100%'}
                value={prompt?.id ?? prompt?.content}
                getCreateLabel={(query) => `+ 自由输入： ${query}`}
                onChange={(value) => {
                    const payload = _.isNaN(parseInt(value ?? '')) ? { content: value ?? '' } : { content: data.find(it => it.value === value).label ?? '', id: value ?? '' }
                    setPrompt(payload)
                }}
                // onSelect={(value) => console.log('onSelect', value)}
            />
            {
                remainTimes > 0 ? (
                    <Button className='dialog-input-button' onClick={send} disabled={loading}>
                        {/* {
                            remainTimes <= 0 ? '体验额度已耗尽' : null
                        } */}
                        {
                            loading ? `处理中（剩余${remainTimes}次）...` : `立即发送（剩余${remainTimes}次）`
                        }
                    </Button>
                ) : (
                    <Button className='dialog-input-button' onClick={showMore} disabled={remainTimes === -100}>
                        {
                            (remainTimes === -100) ? '初始化中' : '开启更多精彩活动'
                        }
                    </Button>
                )
            }
            
        </Box>
    )
}