import axios from 'axios';
// import { error } from '../utils/notification';
import { useGlobalStore } from '../composerables/state';

const api = axios.create({
    baseURL: '/',
    // baseURL: 'http://fc-internal-tongyi-func.fc-internal-tongyi-service2.1740298130743624.cn-hangzhou.fc.devsapp.net',
});

api.interceptors.request.use(
    config => {
        config.headers['x-tongyi-special'] = useGlobalStore.getState().special;
        config.headers['x-tongyi-uid'] = useGlobalStore.getState().user.uid;
        return config;
    }
)

api.interceptors.response.use(
    response => {
        if (response.status >= 300 || response.status < 200) {
            // error({ title: '出错了', message: '网络异常' })
            useGlobalStore.getState().appendFailedConversation('网络异常，请您稍后重试');
            useGlobalStore.getState().setLoading(false);
            return ;
        }
        if (response?.data.success !== true) {
            // error({ title: '出错了', message: response.data.message })
            useGlobalStore.getState().appendFailedConversation('调用出错啦，原因：' + response.data.message);
            useGlobalStore.getState().setLoading(false);
            return ;
        }
        if (response.data?.data?.code) {
            // error({ title: response.data?.data?.code, message: response.data?.data?.message })
            useGlobalStore.getState().appendFailedConversation('调用出错啦，原因：' + response.data?.data?.message);
            useGlobalStore.getState().setLoading(false);
            return ;
        }
        useGlobalStore.getState().setLoading(false)
        return response.data;
    },
    error => {
        error({ title: '出错了', message: '未知错误' });
        // useGlobalStore.getState().appendFailedConversation('服务发生了错误，请您稍后重试');
        useGlobalStore.getState().setLoading(false);
        return Promise.reject(error);
    }
)

// export async function getConfig() {}

export async function chat(payload: { prompt?: string, uid: string, promptId?: string }) {
    return api.post(
        '/api/conversation', 
        payload
    )
}

export async function getBuiltinPrompts() {
    return api.get('/api/builtin-prompts')
}

export async function getConfig() {
    return api.get('/api/config')
}

export async function getRemainTimes() {
    return api.get('/api/remain_times')
}