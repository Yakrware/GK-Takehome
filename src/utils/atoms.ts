import {atom} from 'jotai';
import {Repository} from './types';

export const savedReposAtom = atom<Repository[]>([]);

export const searchesPerMinuteAtom = atom<number>(0);

export const minuteCountdownAtom = atom<number>(60);
