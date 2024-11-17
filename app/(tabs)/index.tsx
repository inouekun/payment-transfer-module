import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.title}>Welcome to Your Banking App</Text>
      <Card mode='elevated' style={styles.card}>
        <Card.Title title='Your Balance' style={styles.cardTitle} />
        <Card.Content>
          <Text style={styles.balance}>$12,345.67</Text>
          <Text style={styles.subtitle}>Last updated: Just now</Text>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <Button
            style={styles.button}
            onPress={() => {
              router.push('/payment');
            }}
          >
            Make a Payment
          </Button>
        </Card.Actions>
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
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    alignSelf: 'center',
  },
  cardAction: {
    paddingTop: 22,
    alignSelf: 'center',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4c669f',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    alignSelf: 'center',
  },
  link: {
    marginTop: 10,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default Home;
