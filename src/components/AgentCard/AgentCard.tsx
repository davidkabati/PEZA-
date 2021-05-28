import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, theme, Text } from '..';
import IAgent from '../../types/agent.type';

const styles = StyleSheet.create({
  container: {},
});

interface Props {
  agent: IAgent;
}
const AgentCard = ({ agent }: Props) => {
  return (
    <Box style={styles.container}>
      <Text>Agent Card</Text>
    </Box>
  );
};

export default AgentCard;
