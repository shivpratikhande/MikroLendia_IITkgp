import { useStore } from 'react-redux';
import { AppStore } from '../store/store';

export const useAppStore = () => useStore<AppStore>();
