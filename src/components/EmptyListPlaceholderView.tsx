import * as React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Button} from './Button';

interface EmptyListPlaceholderProps {
  /**
   * Called when the search button is pressed.
   */
  onSearch: () => void;
}

export default function EmptyListPlaceholder(props: EmptyListPlaceholderProps) {
  const noReposSavedText =
    "Hmm...looks like you don't have any repos saved yet. Try searching for some of your favorite Github repos to save!";
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    if (currentIndex < noReposSavedText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + noReposSavedText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, noReposSavedText]);

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button
          label=" Search GitHub"
          leftIcon="search"
          onPress={props.onSearch}
          isPrimary={true}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.textBubble}>
          <Text style={styles.paragraph}>{currentText}</Text>
          <View style={styles.hairline} />
          <TouchableHighlight
            underlayColor="#fffb74"
            onPress={props.onSearch}
            style={styles.button}>
            <Text>Search</Text>
          </TouchableHighlight>
        </View>

        <Image
          source={{
            uri: 'https://i.gifer.com/1zfr.gif',
          }}
          style={styles.image}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#C9C8A1',
    justifyContent: 'center',
    padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  container: {
    flexDirection: 'column',
    alignContent: 'flex-end',
    paddingTop: 36,
  },
  hairline: {
    backgroundColor: '#C9C8A1',
    height: 1,
    width: '100%',
    marginBottom: 12,
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: 'flex-end',
    marginStart: 60,
  },
  paragraph: {
    marginBottom: 12,
  },
  textBubble: {
    width: '60%',
    backgroundColor: '#FFFDC0',
    borderColor: '#262626',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    marginEnd: 40,
    alignSelf: 'flex-end',
  },
});
