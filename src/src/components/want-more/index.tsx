
import { useGlobalStore } from '../../composerables/state';
import { MORE_SCENCE } from '../../config/constant';
import './index.less';
import { Overlay, Card, Image, Group, Text, Badge } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
export function WantMore() {
    const updateWantMore = useGlobalStore(state => state.updateWantMore);
    const special = useGlobalStore(state => state.special);
    return (
        <Overlay blur={5} center className="want-more">
            <div className="wrap">
            <div className="want-more-title">
                {
                    special ? 
                        <span>您的在线体验次数已用完<br /><a href='https://developer.aliyun.com/adc/scenario/aed6fb72b0644a40a839740600507a88' target='_blank'>立即部署通义千问预体验应用</a>，开启自由对话</span>
                        :
                        <span>您的在线体验次数已用完</span>
                }
                <div className="want-more-title-close" onClick={() => updateWantMore(false)}>
                    <IconX />
                </div>
            </div>
            <div className="want-more-content">
                部署更多 AIGC应用：
                <div className="want-more-content-cards">
                    {
                        MORE_SCENCE.map(
                            scene => (
                                <Card className='want-more-content-cards-card' shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section component="a">
                                        <Image
                                        src={scene.image}
                                        height={160}
                                        alt="Norway"
                                        />
                                    </Card.Section>

                                    <Group position="apart" mt="md" mb="xs">
                                        <Text weight={500}>{scene.title}</Text>
                                        <Badge color="#1366EC" variant="light" style={{'cursor': 'pointer'}} onClick={() => window.open(scene.url)}>
                                            {"去体验 >"}
                                        </Badge>
                                    </Group>

                                    <Text size="sm" color="dimmed">
                                        {scene.description}
                                    </Text>
                                </Card>
                            )
                        )
                    }
                
                </div>
            </div>
            </div>
            
        </Overlay>
    )
}