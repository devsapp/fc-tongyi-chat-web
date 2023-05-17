import axios from 'axios';
import { error } from '../utils/notification';
import { useGlobalStore } from '../composerables/state';


const api = axios.create({
    baseURL: '/',
});

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
            useGlobalStore.getState().appendFailedConversation(response.data.message);
            useGlobalStore.getState().setLoading(false);
            return ;
        }
        if (response.data?.data?.code) {
            // error({ title: response.data?.data?.code, message: response.data?.data?.message })
            useGlobalStore.getState().appendFailedConversation(response.data?.data?.message);
            useGlobalStore.getState().setLoading(false);
            return ;
        }
        useGlobalStore.getState().setLoading(false)
        return response.data;
    },
    error => {
        // error({ title: '出错了', message: '未知错误' });
        useGlobalStore.getState().appendFailedConversation('服务发生了错误，请您稍后重试');
        useGlobalStore.getState().setLoading(false);
        return Promise.reject(error);
    }
)

// export async function getConfig() {}

export async function chat(payload: { prompt: string, uid: string }) {
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