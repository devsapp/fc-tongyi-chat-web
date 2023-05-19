import { getRemainTimes } from "../api";
import { useGlobalStore } from "../composerables/state";
import Promise from 'bluebird'


export async function refreshRemainTimes() {
    const state = useGlobalStore.getState();
    const { data: { remain_times } } = await Promise.delay(5000).then(() => getRemainTimes());
    state.updateRemainTimes(parseInt(remain_times));
}