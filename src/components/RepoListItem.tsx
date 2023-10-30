import Ionicons from '@expo/vector-icons/Ionicons';
import {useAtom} from 'jotai';
import * as React from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {savedReposAtom} from '../utils/atoms';
import {removeSavedRepo, saveRepo} from '../utils/saveUtils';
import {Repository} from '../utils/types';

interface RepoListItemProps {
  /**
   * Time the resposity was created.
   * Formatted in ISO 8601 "YYYY-MM-DDThh:mm:ssZ".
   * @example "2009-07-12T20:10:41Z"
   */
  createdAt: string;

  /**
   * Description text of the repository.
   */
  description?: string;

  /**
   * Full name of the repository.
   */
  fullName: string;

  /**
   * Id of the repository.
   */
  id: string;

  /**
   * Whether or not this reposity is already saved.
   */
  isSaved: boolean;

  /**
   * Language the repository is in.
   */
  language: string;

  /**
   * Number of stargazers for the repository.
   */
  stargazersCount: number;

  /**
   * URL for the repository.
   */
  url: string;
}

export default function RepoListItem(props: RepoListItemProps) {
  const [savedRepos, setSavedRepos] = useAtom(savedReposAtom);
  const nFormat = new Intl.NumberFormat();
  const [saved, setSaved] = React.useState<Boolean>(props.isSaved);
  const repo: Repository = {
    createdAt: props.createdAt,
    fullName: props.fullName,
    id: props.id,
    language: props.language,
    stargazersCount: props.stargazersCount,
    url: props.url,
  };
  const onPressSave = () => {
    var updatedSavedRepos: Repository[] = savedRepos;
    if (saved) {
      removeSavedRepo(props.id);
      updatedSavedRepos = savedRepos.filter(r => r.id !== props.id);
      setSavedRepos(updatedSavedRepos);
    } else {
      saveRepo(repo);
      updatedSavedRepos = savedRepos.concat(repo);
      setSavedRepos(updatedSavedRepos);
    }
    if (updatedSavedRepos.length >= 10) {
      Alert.alert(
        "You've saved the maximum number of 10 repos! Unsave some to save more.",
      );
    }
    setSaved(!saved);
  };
  const repoName = (
    <View style={styles.headerContainer}>
      <Ionicons name="git-branch" size={16} color="gray" />
      <Text
        onPress={() => Linking.openURL(props.url)}
        style={styles.headerTitle}>
        {props.fullName}
      </Text>
    </View>
  );

  const isDisabled = savedRepos.length >= 10 && saved === false;

  const saveButton = (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={isDisabled}
      onPress={onPressSave}
      style={isDisabled ? styles.buttonDisabled : styles.button}>
      <Ionicons
        name={saved ? 'bookmark' : 'bookmark-outline'}
        size={24}
        color={saved ? '#0968DA' : '#A7A6A8'}
      />
    </TouchableOpacity>
  );

  const description =
    props.description != null ? (
      <Text style={styles.description}>{props.description}</Text>
    ) : null;

  const tags = (
    <View style={styles.tagContainer}>
      <Text style={styles.tag}> {props.language}</Text>
      <Text style={styles.tag}>&middot;</Text>
      <Ionicons name="star-outline" size={10} color="gray" />
      <Text style={styles.tag}> {nFormat.format(props.stargazersCount)}</Text>
      <Text style={styles.tag}>&middot;</Text>
      <Text style={styles.tag}>{`Created ${new Date(
        props.createdAt,
      ).toLocaleString()}`}</Text>
    </View>
  );

  return (
    <View style={[styles.listItem, styles.shadow]}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.headerRowContainer}>{repoName}</View>
          {description}
          {tags}
        </View>
        {saveButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    paddingTop: 8,
  },
  button: {
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  buttonDisabled: {
    paddingHorizontal: 4,
    paddingTop: 4,
    opacity: 0.3,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    color: '#0968DA',
  },
  listItem: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    marginVertical: 8,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  tag: {
    color: '#979697',
    fontSize: 10,
    paddingRight: 4,
  },
  tagContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -2,
  },
  textContainer: {
    width: '80%',
  },
});
