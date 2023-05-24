/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { DEFAULT_CONF, INITIAL_CONVERSATION, TONGYI_UID } from '../config/constant'
import { nanoid } from 'nanoid';
import { getBuiltinPrompts, getConfig, getRemainTimes } from '../api';
import _ from 'lodash'
import { devtools } from 'zustand/middleware'
import qs from 'qs'

const query = qs.parse(window.location.href.split('?')[1] ?? '');
const specialUid = query?.uid ?? null;
const special = query?.special ?? null;


export const useGlobalStore = create<any>(devtools((set) => ({
    special: !!special,
    wantMore: false,
    tasks: DEFAULT_CONF.tasks,
    builtinPrompts: {},
    currentTask: DEFAULT_CONF.tasks[0],
    remainTimes: -100,
    config: null,
    user: {
        uid: specialUid ?? (window as any).uid
    },
    history: [
        ...INITIAL_CONVERSATION
    ],
    loading: false,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    updateWantMore: (wantMore: boolean) => set((_state: any) => ({ wantMore, })),
    reduceRemainTimes: () => set((state: any) => ({ remainTimes: state.remainTimes - 1 })),
    updateRemainTimes: (remain_times: number) => set((_state: any) => ({ remainTimes: remain_times })),
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
    appendLoadingConversation: () => set(state => ({ history: [...state.history, { id: '$loading', content: <div className='ai-loading'>AI正在思考中...</div>, status: 'success', from: TONGYI_UID }] })),
    appendFailedConversation: (content?: string) => set(state => ({ history: [...state.history.filter(h => h.id !== '$loading'), { id: nanoid(), content: content ?? '出错啦，请您换个问题', status: 'failed', from: TONGYI_UID }] })),
    appendConversation: (content: string, from: string) => set(state => ({ history: [ ...state.history.filter(h => h.id !== '$loading'), { id: nanoid(), content, status: 'success', from  } ] }))
})))


export async function init() {
    const state = useGlobalStore.getState();
    (window as any)._state = state;
    const [ { data: builtinPrompts }, { data: config }, { data: { remain_times, special_remain_times } } ] = await Promise.all([
        getBuiltinPrompts(),
        getConfig(),
        getRemainTimes(),
    ])
    console.log('builtinPrompts', builtinPrompts, _.groupBy(builtinPrompts, item => item.category))
    state.updateBuiltinPrompts(_.groupBy(builtinPrompts, item => item.category));
    state.updateConfig(_.fromPairs(config.map(item => [item.flag, item.value])))
    state.updateRemainTimes(parseInt(state.special ? special_remain_times : remain_times))
}

init()