import { nanoid } from 'nanoid'
import tongyiIcon from '../assets/tongyi.png';
import { IconUserCircle } from '@tabler/icons-react';

export const TONGYI_UID = '$tongyi';

export const DEFAULT_CONF = {
    tasks: [
        {
            id: 'codegen',
            title: '代码生成',
            description: '根据用户的输入或需求，自动生成或修改代码，也可以和用户交流，解释或优化代码。通义千问支持多种编程语言，如 Python, Java, C#, JavaScript 等。',
            builtinPrompts: []
        },
        {
            id: 'literal',
            title: '文案创作',
            description: '想要运营没有文案，想要写文章没有思路，把需求告诉通义千问，即可让人工智能帮助你完成文案的创作，帮助你提升效率。',
            builtinPrompts: []
        },
        {
            id: 'tech',
            title: '技术百科',
            description: '想要学习新技术，想要查询更多知识，通义千问是你的百科全书，可以作为你的百科助理，为你提供准确靠谱的回答。',
            builtinPrompts: []
        },
        {
            id: 'work',
            title: '工作规划',
            description: '如果你想要对自己的工作有什么规划，需要 AI 帮你出谋划策，可以告诉通义千问，通义千问会为你提供参考建议。',
            builtinPrompts: []
        },
        {
            id: 'more',
            title: '更多可能',
            description: '通义千问还可以做更多有趣的事情，可以生成图片，可以查看菜谱，可以为你出谋划策。',
            builtinPrompts: []
        },
    ]
}

export const INITIAL_CONVERSATION = [
    {
        id: nanoid(),
        content: '请问有什么可以帮您？',
        status: 'success',
        from: TONGYI_UID
    },
]


export const Avatars = {
    [TONGYI_UID]: tongyiIcon,
    'user': <IconUserCircle />
} 
