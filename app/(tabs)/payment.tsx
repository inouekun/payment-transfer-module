import { View, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextInput, Button, Text, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { useMainStore, useTransactionStore } from '@/stores/useStore';

type Data = { recipient: string; amount: string; note?: string };

const Payment = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const { fund, spend } = useMainStore();
  const { setTransaction, clearTransaction } = useTransactionStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Data>();

  const [isProcessing, setIsProcessing] = useState(false);

  const simulateApiCall = (amount: number, currentBalance: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount > currentBalance) {
          reject(new Error('Insufficient funds'));
        } else {
          spend(amount);
          resolve(true); // Simulate successful transaction
        }
      }, 2000); // Simulate network delay
    });
  };

  const handleBiometricAuthentication = async (): Promise<boolean> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Error', 'Biometric authentication is not supported on this device.');
        return false;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Error', 'No biometric authentication methods are enrolled.');
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to confirm payment',
        fallbackLabel: 'Use PIN',
      });

      if (result.success) {
        return true;
      } else {
        Alert.alert('Authentication Failed', 'Unable to authenticate. Please try again.');
        return false;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during authentication.');
      return false;
    }
  };

  const onSubmit = async (data: Data) => {
    const { recipient, amount } = data;
    const amountNumber = parseFloat(amount);

    const isAuthenticated = await handleBiometricAuthentication();
    // Had to disable because am having issue getting simulator up and running
    if (!isAuthenticated) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      const success = await simulateApiCall(amountNumber, fund);

      if (success) {
        setTransaction({
          transactionId: `TXN-${Math.floor(Math.random() * 10000)}`,
          recipient,
          amount: amountNumber,
          status: 'successful',
        });
        router.push('/confirmation');
      } else {
        throw new Error('Transaction Failed');
      }
    } catch (error: any) {
      Alert.alert('Transaction Error', error.message || 'An error occurred while processing the transaction.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title='Payment Transfer' />
        <Card.Content>
          <Text style={styles.balance}>Current Balance: RM {fund.toFixed(2)}</Text>

          <Controller
            control={control}
            name='recipient'
            rules={{ required: 'Recipient is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                disabled={isProcessing}
                label='Recipient'
                mode='outlined'
                placeholder='Enter recipient name'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                error={!!errors.recipient}
              />
            )}
          />
          {errors.recipient && <Text style={styles.error}>{errors.recipient.message as string}</Text>}

          <Controller
            control={control}
            name='amount'
            rules={{
              required: 'Amount is required',
              validate: (value) => parseFloat(value) > 0 || 'Amount must be greater than 0',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                disabled={isProcessing}
                label='Amount'
                mode='outlined'
                placeholder='Enter amount'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                error={!!errors.amount}
              />
            )}
          />
          {errors.amount && <Text style={styles.error}>{errors.amount.message as string}</Text>}

          <Controller
            control={control}
            name='note'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                disabled={isProcessing}
                label='Note (optional)'
                mode='outlined'
                placeholder='Add a note for the recipient'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />

          <Button disabled={isProcessing} mode='contained' onPress={handleSubmit(onSubmit)}>
            {isProcessing ? 'Processing...' : 'Transfer'}
          </Button>
        </Card.Content>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    padding: 15,
  },
  balance: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Payment;
