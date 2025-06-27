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
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';  // Import react-native-video

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    image: require('../assets/story.png'),
    title: 'Welcome to SparoPay',
    text: 'Buy data, airtime, pay bills, deliver packages, and earn rewards in one powerful app.',
  },
  {
    key: '2',
    image: require('../assets/bills.png'),
    title: 'Top-Up & Pay Bills Instantly',
    text: 'Recharge airtime, buy data, fund betting accounts, and pay bills in seconds.',
  },
  {
    key: '3',
    image: require('../assets/biking.gif'),
    title: 'Deliver and Receive Packages',
    text: 'Deliver items to your customers’ doorstep quickly, anytime, anywhere.',

  },
  {
    key: '4',
    image: require('../assets/rewards.png'),
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
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {/* Carousel */}
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
            <Text style={styles.slideTitle}>
  <Text style={styles.slideTitleHighlight}>
    {slide.title.split(' ')[0]}{' '}
  </Text>
  {slide.title.split(' ').slice(1).join(' ')}
</Text>  
          <Text style={styles.slideText}>{slide.text}</Text>

             {/* Display video if available */}
            {slide.video && (
              <Video
                source={slide.video}
                style={styles.video}
                resizeMode="contain"
                repeat={true}
                muted={true}
              />
            )}

            {/* Display image if no video */}
            {!slide.video && <Image source={slide.image} style={styles.slideImage} />}
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, idx) => (
          <View key={idx} style={[styles.dot, activeIndex === idx && styles.activeDot]} />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => alert('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => alert('Register')}>
          <Text style={[styles.buttonText, styles.registerButtonText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  carousel: {
    flexGrow: 0,
  },
  slide: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 5,
    marginTop: -15,
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
  slideTitleHighlight: {
    color: '#007312',
  },
  slideText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    lineHeight: 20,
  },
  slideImage: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: 'contain',
    marginBottom: 20,
    
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
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 6,
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
    fontSize: 15,
    color: '#fff',
        fontFamily: 'Poppins-Regular',

  },
  
  video: {
    width: width * 0.8,
    height: height * 0.3,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#007312',
        fontFamily: 'Poppins-Regular',

  },
});
