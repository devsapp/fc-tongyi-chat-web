import {  Navbar, NavLink } from '@mantine/core';
import { useGlobalStore } from '../../composerables/state';
import './index.less';
import classnames from 'classnames';

export const Nav = () => {
    const tasks = useGlobalStore((state: any) => state.tasks);
    const special = useGlobalStore((state: any) => state.special);
    const currentTask = useGlobalStore((state: any) => state.currentTask);
    const updateCurrentTask = useGlobalStore(state => state.updateCurrentTask)
    return (
        <>
            <Navbar className="navbar" width={{ base: 300 }} p="xs">
                {
                    tasks.map(
                        task => (
                            <div className={classnames(['nav-card', { 'highlight': task.id === currentTask?.id }])} key={task.id}>
                                {
                                    task.id === currentTask?.id ?
                                    <div className='hightlight-nav'>
                                        <div>
                                            <div className='title'>{task.title}</div>
                                            <hr className='hr'/>
                                            <div className='description'>{task.description}</div>
                                        </div>
                                    </div>
                                    :
                                    <NavLink className='link' h={50} label={task.title} onClick={() => updateCurrentTask(task.id)}/>
                                }
                            </div>
                        )
                    )
                }
                {
                    special ? 
                    (<span className="navbar-tips">
                        * 当前页面仅支持预设文案模拟体验，更多自由输入内容请在API服务开放后进行调用
                    </span>)
                    : null
                }
            </Navbar>
        </>
    )
}