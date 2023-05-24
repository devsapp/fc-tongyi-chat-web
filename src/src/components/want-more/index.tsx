
import { useGlobalStore } from '../../composerables/state';
import { MORE_SCENCE } from '../../config/constant';
import './index.less';
import { Overlay, Card, Image, Group, Text, Badge } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
export function WantMore() {
    const updateWantMore = useGlobalStore(state => state.updateWantMore);
    return (
        <Overlay blur={5} center className="want-more">
            <div className="wrap">
            <div className="want-more-title">
                恭喜您已经通关通义千问预体验活动！
                <div className="want-more-title-close" onClick={() => updateWantMore(false)}>
                    <IconX />
                </div>
            </div>
            <div className="want-more-content">
                您可以<a href='https://developer.aliyun.com/adc/scenario/aed6fb72b0644a40a839740600507a88' target='_blank'>部署自己的通义千问机器人</a>，或参与其他活动：
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