import {Alert} from 'react-native';
import {Repository} from './types';

export const saveRepo = (repo: Repository) => {
  fetch('http://localhost:8080/repo/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: repo.id,
      fullName: repo.fullName,
      createdAt: repo.createdAt,
      stargazersCount: repo.stargazersCount,
      language: repo.language,
      url: repo.url,
    }),
  }).catch(error => {
    console.error(error);
  });
};

export const removeSavedRepo = (id: string) => {
  fetch(`http://localhost:8080/repo/${id}`, {
    method: 'DELETE',
  }).catch(error => {
    Alert.alert('Error', 'Could not unsave this repo. Please try again later.');
    console.error(error);
  });
};
