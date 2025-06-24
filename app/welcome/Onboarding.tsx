import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    image: require('../assets/story.png'),
    title: 'Welcome to Sparopay',
    text: 'Buy data, airtime, pay bills, deliver packages, and earn rewards in one powerful app.',
  },
  {
    key: '2',
    image: require('../assets/biker.png'),
    title: 'Top Up & Pay Bills Instantly',
    text: 'Recharge airtime, buy data, fund betting accounts, and pay bills in seconds.',
  },
  {
    key: '3',
    image: require('../assets/bikes.png'),
    title: 'Deliver and Recieve Packages ',
    text: 'Deliver items to your customers doorstep quickly, anytime, anywhere.',
  },
  {
    key: '4',
    image: require('../assets/biker.png'),
    title: 'Earn Rewards',
    text: 'Earn cashback when you buy services—saving while spending made easy!',
  },
];

export default function OnboardingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Logo and Brand Name */}
      <View style={styles.brandRow}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.brandText}>Sparopay</Text>
      </View>

      {/* Slide Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ width: width * slides.length }}
        style={styles.carousel}
      >
        {slides.map((slide) => (
          <View key={slide.key} style={[styles.slide, { width }]}>
                        <Text style={styles.slideTitle}>{slide.title}</Text>
            <Image source={slide.image} style={styles.slideImage} />
            <Text style={styles.slideText}>{slide.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Slide Indicators */}
      <View style={styles.dotsContainer}>
        {slides.map((_, idx) => (
          <View key={idx} style={[styles.dot, activeIndex === idx && styles.activeDot]} />
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => alert('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => alert('Register')}>
          <Text style={[styles.buttonText, styles.registerButtonText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#297628',
  },
  carousel: {
    height: height * 0.40,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideImage: {
    width: width * 1,
    height: height * 0.29,
    resizeMode: 'contain',
    marginBottom: 1,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
    marginBottom: 5,
  },
  slideText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingBottom: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007312',
  },
  buttonsRow: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  loginButton: {
    backgroundColor: '#007312',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#007312',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  registerButtonText: {
    color: '#007312',
  },
});
