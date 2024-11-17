import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTransactionStore } from '@/stores/useStore';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Text } from 'react-native-paper';

const TransactionConfirmation = () => {
  const { transactionId, recipient, amount, status, clearTransaction } = useTransactionStore();
  const route = useRouter();
  const handleGoBack = () => {
    clearTransaction();
    route.push('/(tabs)');
  };

  if (!transactionId) {
    return <Text>No transaction data available</Text>;
  }

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title='Transaction Successful' />
        <Card.Content>
          <Text>Transaction ID: {transactionId}</Text>
          <Text>Recipient: {recipient}</Text>
          <Text>Amount: RM {amount}</Text>
          <Text>Status: {status}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleGoBack}>Back to Home</Button>
        </Card.Actions>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    borderRadius: 10,
    padding: 15,
  },
});

export default TransactionConfirmation;
