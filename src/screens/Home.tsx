import Ionicons from '@expo/vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAtom} from 'jotai';
import React, {useEffect, useMemo} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import EmptyListPlaceholder from '../components/EmptyListPlaceholderView';
import SavedRepoList from '../components/SavedRepoListView';
import {
  minuteCountdownAtom,
  savedReposAtom,
  searchesPerMinuteAtom,
} from '../utils/atoms';
import {RootStackParamList} from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const insetCalc = (insets: EdgeInsets) => ({
  paddingTop: Math.max(insets.top, 16),
  paddingBottom: Math.max(insets.bottom, 16),
  paddingLeft: Math.max(insets.left, 16),
  paddingRight: Math.max(insets.right, 16),
});

export const Home = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();

  const style = useMemo(() => insetCalc(insets), [insets]);

  const [savedRepos, setSavedRepos] = useAtom(savedReposAtom);
  const [_, setSearchesPerMinute] = useAtom(searchesPerMinuteAtom);
  const [minuteCountdown, setMinuteCountdown] = useAtom(minuteCountdownAtom);

  const fetchSavedRepos = () => {
    return fetch('http://localhost:8080/repo/')
      .then(response => response.json())
      .then(json => {
        setSavedRepos(json.repos);
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Could not fetch saved repos. Please try again later.',
        );
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSavedRepos();
  }, []);

  // This timer is needed to due to Github's unauthenticated rate limit of 10
  // searches per minute. We want to let the user know they can retry their
  // search in x seconds if they've hit the rate limit.
  useEffect(() => {
    const interval = setInterval(() => {
      if (minuteCountdown === 0) {
        setMinuteCountdown(60);
        setSearchesPerMinute(0);
      } else {
        setMinuteCountdown(minuteCountdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minuteCountdown, setMinuteCountdown, setSearchesPerMinute]);

  const onSearch = () => {
    navigation.navigate('Search');
  };

  const headerImage = (
    <Image
      style={[styles.headerImage, {marginTop: insets.top}]}
      source={require('../assets/gitgraph.png')}
    />
  );

  const pageTitleDescription = (
    <>
      <Ionicons
        name="bookmark"
        size={40}
        color="#0968DA"
        style={styles.pageTitleIcon}
      />
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>My Favorite Repos</Text>
      </View>
      <Text style={styles.pageDescription}>
        Save your top 10 Github repos in one place.
      </Text>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      {headerImage}
      <View style={style}>
        {pageTitleDescription}
        {savedRepos.length === 0 ? (
          <>
            <EmptyListPlaceholder onSearch={onSearch} />
          </>
        ) : (
          <SavedRepoList onSearch={onSearch} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headerImage: {
    width: '100%',
    height: 90,
    alignSelf: 'center',
    marginBottom: -44,
  },
  pageTitle: {
    alignSelf: 'flex-start',
    fontSize: 32,
    fontWeight: 'bold',
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  pageTitleIcon: {
    marginStart: -6,
  },
  pageDescription: {
    alignSelf: 'flex-start',
    fontSize: 16,
    paddingTop: 12,
  },
});
