import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    width: theme.constants.screenWidth,
    height: 50,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerTab: {
    width: '95%',
    height: '85%',
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  text1: string;
  text2: string;
  setSelected: (value: string) => void;
}

const Tabs = ({ text1, text2, setSelected }: Props) => {
  const [active, setActive] = useState<string>(text1);

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setActive(text1);
          setSelected(text1);
        }}
        activeOpacity={1}
        style={styles.tab}>
        <Box style={active === text1 && styles.innerTab}>
          <Text variant="b1" color={active === text1 ? 'white' : 'dark'}>
            {text1}
          </Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setActive(text2);
          setSelected(text2);
        }}
        activeOpacity={1}
        style={styles.tab}>
        <Box style={active === text2 && styles.innerTab}>
          <Text variant="b1" color={active === text2 ? 'white' : 'dark'}>
            {text2}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Tabs;
