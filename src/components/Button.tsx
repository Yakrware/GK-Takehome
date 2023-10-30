import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlightProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface ButtonProps extends TouchableHighlightProps {
  /**
   * Text label of the button.
   */
  label?: string | undefined;

  /**
   * String name of icon to show on the left of the button label when a label exists.
   */
  leftIcon?: keyof typeof Ionicons.glyphMap;

  /**
   * Called when button is pressed.
   */
  onPress?: () => void;

  /**
   * String name of icon to show on the right of the button label when a label exists.
   */
  rightIcon?: keyof typeof Ionicons.glyphMap;

  /**
   * True if this button is the primary action of the screen.
   */
  isPrimary?: boolean;
}

export const Button = (props: ButtonProps) => {
  const iconColor = props.isPrimary ? 'white' : 'black';
  const iconSize = 16;
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={
          props.isPrimary
            ? [styles.button, styles.primaryButton]
            : styles.button
        }>
        {props.leftIcon != null ? (
          <Ionicons
            color={iconColor}
            name={props.leftIcon}
            size={iconSize}
            style={styles.icon}
          />
        ) : null}

        <Text
          style={
            props.isPrimary ? styles.primaryButtonLabel : styles.buttonLabel
          }>
          {props.label}
        </Text>

        {props.rightIcon != null ? (
          <Ionicons
            color={iconColor}
            name={props.rightIcon}
            size={iconSize}
            style={styles.icon}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLabel: {
    fontSize: 16,
  },
  icon: {
    alignSelf: 'center',
  },
  primaryButton: {
    backgroundColor: '#0968DA',
  },
  primaryButtonLabel: {
    color: 'white',
    fontSize: 16,
  },
  sortOptionButton: {
    borderRadius: 0,
    backgroundColor: 'white',
  },
});
