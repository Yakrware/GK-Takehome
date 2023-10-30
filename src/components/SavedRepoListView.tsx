import {useAtom} from 'jotai';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {savedReposAtom} from '../utils/atoms';
import {Button} from './Button';
import RepoListItem from './RepoListItem';

interface SavedRepoListProps {
  /**
   * Called when the search button is pressed.
   */
  onSearch: () => void;
}

type SortOption = 'ascend' | 'descend';

export default function SavedRepoList(props: SavedRepoListProps) {
  const [savedRepos, setSavedRepos] = useAtom(savedReposAtom);
  const [seletedSort, setSelectedSort] = React.useState<SortOption | null>(
    null,
  );

  const onSort = () => {
    if (seletedSort === 'descend') {
      setSelectedSort('ascend');
      onSortAscend();
    } else {
      setSelectedSort('descend');
      onSortDescend();
    }
  };

  const onSortAscend = () => {
    setSelectedSort('ascend');
    setSavedRepos(
      savedRepos.sort((r1, r2) => r1.stargazersCount - r2.stargazersCount),
    );
  };

  const onSortDescend = () => {
    setSelectedSort('descend');
    setSavedRepos(
      savedRepos.sort((r1, r2) => r2.stargazersCount - r1.stargazersCount),
    );
  };

  const searchSortButtonGroup = (
    <View style={styles.buttonContainer}>
      <Button
        label=" Search GitHub"
        leftIcon="search"
        onPress={props.onSearch}
        isPrimary={true}
      />
      <View>
        <Button
          label="Sort by stars"
          leftIcon={seletedSort === 'descend' ? 'arrow-down' : 'arrow-up'}
          onPress={onSort}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {searchSortButtonGroup}
      {savedRepos.map(repo => (
        <RepoListItem
          key={'savedrepo_' + repo.id}
          createdAt={repo.createdAt}
          description={repo.url}
          fullName={repo.fullName}
          id={repo.id}
          isSaved={true}
          language={repo.language}
          stargazersCount={repo.stargazersCount}
          url={repo.url}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  container: {
    marginTop: 24,
  },
  sortOptionButton: {
    borderRadius: 0,
    backgroundColor: 'white',
  },
});
