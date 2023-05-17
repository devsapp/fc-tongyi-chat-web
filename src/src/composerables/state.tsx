/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { DEFAULT_CONF, INITIAL_CONVERSATION, TONGYI_UID } from '../config/constant'
import { nanoid } from 'nanoid';
import { getBuiltinPrompts, getConfig } from '../api';
import _ from 'lodash'
import { devtools } from 'zustand/middleware'
// import { loading } from '../utils/notification';

export const useGlobalStore = create<any>(devtools((set) => ({
    special: false,
    tasks: DEFAULT_CONF.tasks,
    builtinPrompts: {},
    currentTask: DEFAULT_CONF.tasks[0],
    config: null,
    user: {
        uid: (window as any).uid
    },
    history: [
        ...INITIAL_CONVERSATION
    ],
    loading: false,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    updateConfig: (conf: any) => set((_state: any) => ({ config: conf })),
    updateBuiltinPrompts: (prompts: any) => set({ builtinPrompts: prompts }),
    updateCurrentTask: (taskId: string) => set(
        (state) => {
            const currentTask = state.tasks.find(t => t.id === taskId);
            return { currentTask };
        }
    ),
    setLoading: (status: boolean) => set((_state) => {
        // if (status) loading({ title:'请稍后', message: '通义千问正在回答中...' })
        return ({ loading: status })
    }),
    appendLoadingConversation: () => set(state => ({ history: [...state.history, { id: '$loading', content: <span className='ai-loading'>AI正在思考中...</span>, status: 'success', from: TONGYI_UID }] })),
    appendFailedConversation: (content?: string) => set(state => ({ history: [...state.history, { id: nanoid(), content: content ?? '出错啦，请您换个问题', status: 'failed', from: TONGYI_UID }] })),
    appendConversation: (content: string, from: string) => set(state => ({ history: [ ...state.history.filter(h => h.id !== '$loading'), { id: nanoid(), content, status: 'success', from  } ] }))
})))


export async function init() {
    const state = useGlobalStore.getState();
    (window as any)._state = state;
    const [ { data: builtinPrompts }, { data: config } ] = await Promise.all([
        getBuiltinPrompts(),
        getConfig()
    ])
    console.log('builtinPrompts', builtinPrompts, _.groupBy(builtinPrompts, item => item.category))
    state.updateBuiltinPrompts(_.groupBy(builtinPrompts, item => item.category));
    state.updateConfig(_.fromPairs(config.map(item => [item.flag, item.value])))

}

init()