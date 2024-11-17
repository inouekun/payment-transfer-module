import { View, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextInput, Button, Text, Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { useMainStore } from '@/stores/useStore';

type Data = { recipient: string; amount: string; note?: string };

const Payment = () => {
  const { colors } = useTheme();

  // const [balance, setBalance] = useState(5000); // Simulated account balance
  const { fund, spend } = useMainStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Data>();

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

  const onSubmit: SubmitHandler<Data> = async (data) => {
    const { recipient, amount } = data;
    const amountNumber = parseFloat(amount);

    if (amountNumber > fund) {
      alert("You don't have enough funds to complete this transaction.");
      // Alert.alert('Insufficient Balance', "You don't have enough funds to complete this transaction.");
      return;
    }

    const isAuthenticated = await handleBiometricAuthentication();
    if (!isAuthenticated) return;

    alert(`You have sent RM${amount} to ${recipient}.`);
    // Alert.alert('Payment Successful', `You have sent $${amount} to ${recipient}.`);
    spend(amountNumber);
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
              <TextInput label='Recipient' mode='outlined' placeholder='Enter recipient name' onBlur={onBlur} onChangeText={onChange} value={value} style={styles.input} error={!!errors.recipient} />
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
              <TextInput label='Note (optional)' mode='outlined' placeholder='Add a note for the recipient' onBlur={onBlur} onChangeText={onChange} value={value} style={styles.input} />
            )}
          />

          <Button mode='contained' onPress={handleSubmit(onSubmit)} style={[styles.button, { backgroundColor: colors.primary }]}>
            Transfer
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
