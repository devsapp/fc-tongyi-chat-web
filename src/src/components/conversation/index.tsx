import classNames from 'classnames';
import './index.less';
import { Box, Avatar, Card, Image } from '@mantine/core';
import { Avatars, TONGYI_UID } from '../../config/constant';
import Markdown from 'marked-react';
import Lowlight from 'react-lowlight';
import 'highlight.js/styles/dark.css'

// import 'react-lowlight/all';

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import markdown from 'highlight.js/lib/languages/markdown';
import csharp from 'highlight.js/lib/languages/csharp';
import lua from 'highlight.js/lib/languages/lua';
import less from 'highlight.js/lib/languages/less';
import scss from 'highlight.js/lib/languages/scss';
import _ from 'lodash';

const languages = {
    'js': javascript,
    'javascript': javascript,
    'python': python,
    'ts': typescript,
    'tsx': typescript,
    'bash': bash,
    'json': json,
    'java': java,
    'go': go,
    'c': c,
    'cpp': cpp,
    'markdown': markdown,
    'csharp': csharp,
    'css': css,
    'lua': lua,
    'less': less,
    'sass': scss,
    'scss': scss,
}

_.entries(languages).map(pair => Lowlight.registerLanguage(pair[0], pair[1]));

const renderer = {
    code(snippet, lang) {
      return <Lowlight key={(this as any).elementId} language={languages[lang]? lang : null} value={snippet} />;
    },
  };

export function Conversation(props: { item: any }) {

    return (
        <Box
            className={classNames(['conversation', { 'me': props.item.from !== TONGYI_UID }])}
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
            })}
        >
        <Avatar className='conversation-avator' color="cyan" radius="xl">
            { props.item.from === TONGYI_UID ? <Image src={Avatars[TONGYI_UID]}/> : Avatars.user }
        </Avatar>
        <Card className='conversation-content' pl="10" pr="10" pt="0" pb='0' ml="xl" mr='xl' radius='md'
            sx={(theme) => ({ 
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: '#333',
                paddingLeft: '20px',
                paddingRight: '20px',
            })}>
            {
                _.startsWith(props.item.id, '$') ? props.item.content : <Markdown value={props.item.content} renderer={renderer} />
            }
        </Card>
    </Box>
    )
}