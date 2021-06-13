import React, { ReactNode, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: theme.constants.screenWidth,
  },
  amenity: {
    width: 100,
    height: 48,
    backgroundColor: theme.colors.white,
    marginHorizontal: 12,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

type Item = {
  id: number;
  value: string;
  icon?: ReactNode;
  icon2?: ReactNode;
};

interface Props {
  items: Item[];
  setSelection: (array: string[]) => void;
}

const Multiselect = ({ items, setSelection }: Props) => {
  const [array, setArray] = useState<string[]>([]);

  const checkIfExists = (arr: string[], value: string) => {
    if (arr.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromArray = (arr: string[], value: string) => {
    const result = arr.filter((v) => {
      return v !== value;
    });
    setArray(result);
    setSelection(result);
    return;
  };

  const addToArray = (arr: string[], value: string) => {
    const newArr = [...array, value];
    setArray(newArr);
    setSelection(newArr);
  };

  const handleMultiselect = (value: string) => {
    const isInArray = checkIfExists(array, value);
    if (isInArray) {
      removeFromArray(array, value);
    } else {
      addToArray(array, value);
    }
  };

  return (
    <Box style={styles.container}>
      {items.map((a: Item) => (
        <TouchableOpacity
          onPress={() => handleMultiselect(a.value)}
          key={a.id}
          style={[
            styles.amenity,
            {
              backgroundColor: checkIfExists(array, a.value)
                ? theme.colors.primary
                : theme.colors.white,
            },
          ]}>
          {checkIfExists(array, a.value) ? a.icon2 : a.icon}
          <Text variant="b1" ml="m" color={checkIfExists(array, a.value) ? 'white' : 'dark'}>
            {a.value}
          </Text>
        </TouchableOpacity>
      ))}
    </Box>
  );
};

export default Multiselect;
