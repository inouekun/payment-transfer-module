import { create } from 'zustand';

type MainState = {
  fund: number;
  spend: (by: number) => void;
};

type TransactionState = {
  transactionId: string | null;
  recipient: string | null;
  amount: number | null;
  status: 'idle' | 'processing' | 'successful' | 'failed';
};

type TransactionAction = {
  setTransaction: (transaction: TransactionState) => void;
  clearTransaction: () => void;
} & TransactionState;

export const useMainStore = create<MainState>((set) => ({
  fund: 500,
  spend: (by) => set((state) => ({ fund: state.fund - by })),
}));

export const useTransactionStore = create<TransactionAction>((set) => ({
  transactionId: null,
  recipient: null,
  amount: null,
  status: 'idle',
  setTransaction: (transaction) => set({ ...transaction }),
  clearTransaction: () => set({ transactionId: null, recipient: null, amount: null, status: 'idle' }),
}));
