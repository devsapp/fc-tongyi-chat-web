import { nanoid } from 'nanoid'
import tongyiIcon from '../assets/tongyi.png';
import { IconUserCircle } from '@tabler/icons-react';

export const TONGYI_UID = '$tongyi';

export const DEFAULT_CONF = {
    tasks: [
        {
            id: 'codegen',
            title: '代码生成',
            description: '根据用户的输入或需求，自动生成或修改代码，也可以和用户交流，解释或优化代码。通义千问支持多种编程语言，如 Python, Java, C#, JavaScript 等，并且可以在不同的操作系统上运行，如 Mac, Windows, Linux 等。',
            builtinPrompts: []
        },
        {
            id: 'literal',
            title: '文案创作',
            description: '根据用户的输入或需求，自动生成或修改代码，也可以和用户交流，解释或优化代码。通义千问支持多种编程语言，如 Python, Java, C#, JavaScript 等，并且可以在不同的操作系统上运行，如 Mac, Windows, Linux 等。',
            builtinPrompts: []
        },
        {
            id: 'tech',
            title: '技术百科',
            description: '根据用户的输入或需求，自动生成或修改代码，也可以和用户交流，解释或优化代码。通义千问支持多种编程语言，如 Python, Java, C#, JavaScript 等，并且可以在不同的操作系统上运行，如 Mac, Windows, Linux 等。',
            builtinPrompts: []
        },
        {
            id: 'work',
            title: '工作规划',
            description: '根据用户的输入或需求，自动生成或修改代码，也可以和用户交流，解释或优化代码。通义千问支持多种编程语言，如 Python, Java, C#, JavaScript 等，并且可以在不同的操作系统上运行，如 Mac, Windows, Linux 等。',
            builtinPrompts: []
        },
        {
            id: 'more',
            title: '更多可能',
            description: '根据用户的输入或需求，自动生成或修改代码，也可以和用户交流，解释或优化代码。通义千问支持多种编程语言，如 Python, Java, C#, JavaScript 等，并且可以在不同的操作系统上运行，如 Mac, Windows, Linux 等。',
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
