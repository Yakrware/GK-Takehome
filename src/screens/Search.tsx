import Ionicons from '@expo/vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAtom} from 'jotai';
import debounce from 'lodash/debounce';
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import RepoListItem from '../components/RepoListItem';
import {
  minuteCountdownAtom,
  savedReposAtom,
  searchesPerMinuteAtom,
} from '../utils/atoms';
import {GithubResponseRepository, RootStackParamList} from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const insetCalc = (insets: EdgeInsets) => ({
  paddingTop: Math.max(insets.top, 16),
  paddingBottom: Math.max(insets.bottom, 16),
  paddingLeft: Math.max(insets.left, 16),
  paddingRight: Math.max(insets.right, 16),
});

// TODO: fix navigation type
export const Search = ({navigation}: Props) => {
  const [savedRepos] = useAtom(savedReposAtom);
  const [searchesPerMinute, setSearchesPerMinute] = useAtom(
    searchesPerMinuteAtom,
  );
  const [minuteCountdown, setMinuteCountdown] = useAtom(minuteCountdownAtom);

  const insets = useSafeAreaInsets();

  const style = useMemo(() => insetCalc(insets), [insets]);

  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [results, setResults] = useState<GithubResponseRepository[]>([]);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);

  const searchGithub = React.useCallback((phrase: string) => {
    return fetch(`https://api.github.com/search/repositories?q=${phrase}`)
      .then(response => response.json())
      .then(json => {
        setLoadingResults(false);
        setResults(json.items);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((phrase: string) => {
        if (searchesPerMinute === 0) {
          setMinuteCountdown(60);
        }
        setSearchesPerMinute(searchesPerMinute + 1);
        searchGithub(phrase);
      }, 500),
    [searchGithub, searchesPerMinute, setMinuteCountdown, setSearchesPerMinute],
  );

  const onSearchTextChange = (text: string) => {
    setSearchPhrase(text);
    setLoadingResults(true);
    debouncedSearch(text);
    if (searchesPerMinute >= 10) {
      Alert.alert(
        `Sorry, we can only process 10 searches per minute. Please retry in ${minuteCountdown} seconds.`,
      );
    }
  };

  const onSearchSubmit = () => {
    setLoadingResults(true);
    debouncedSearch(searchPhrase);
  };

  const onBack = () => {
    navigation.navigate('Home');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const searchBar = (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text>Back</Text>
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <Ionicons color="#979697" name="search" size={20} />
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="Search Github repositories"
          placeholderTextColor="#979697"
          value={searchPhrase}
          onChangeText={onSearchTextChange}
          onBlur={() => {
            dismissKeyboard();
          }}
          onSubmitEditing={onSearchSubmit}
        />
      </View>
    </View>
  );

  const saveLimitReachedMessage =
    savedRepos.length >= 10 ? (
      <View style={styles.alertContainer}>
        <Text style={styles.alert}>
          You cannot save more than 10 repositories at a time.
        </Text>
        <Text style={styles.alert}>Try unsaving some before saving more.</Text>
      </View>
    ) : null;

  const rateLimitReachedMessage =
    searchesPerMinute > 10 ? (
      <View style={styles.searchLimitAlertContainer}>
        <Text style={styles.searchLimitAlert}>
          Try searching again in {minuteCountdown} seconds.
        </Text>
      </View>
    ) : null;

  const resultList = (
    <ScrollView
      onScroll={dismissKeyboard}
      contentContainerStyle={styles.results}>
      {loadingResults ? (
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text>Loading results...</Text>
        </View>
      ) : results != null && results.length >= 0 ? (
        results.map(repo => (
          <RepoListItem
            key={'gitresult_' + repo.id}
            createdAt={repo.created_at}
            description={repo.description}
            fullName={repo.full_name}
            id={repo.id.toString()}
            isSaved={savedRepos.find(r => r.id === repo.id.toString()) != null}
            language={repo.language}
            stargazersCount={repo.stargazers_count}
            url={repo.html_url}
          />
        ))
      ) : null}
    </ScrollView>
  );
  return (
    <View style={style}>
      {searchBar}
      {saveLimitReachedMessage}
      {rateLimitReachedMessage}
      {resultList}
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    fontSize: 12,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  alertContainer: {
    backgroundColor: '#FFD7D7',
    padding: 8,
    borderRadius: 8,
    margin: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
  },
  input: {
    width: '80%',
    fontSize: 16,
    marginLeft: 4,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  results: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  searchBar: {
    backgroundColor: '#E7E7E7',
    flexGrow: 1,
    flexDirection: 'row',
    margin: 8,
    borderRadius: 32,
    padding: 8,
  },
  searchLimitAlert: {
    fontSize: 12,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  searchLimitAlertContainer: {
    padding: 8,
    borderRadius: 8,
    margin: 8,
  },
});
