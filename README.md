# Hotel App Documentation

## Overview

The Hotel_Booking App is a mobile application designed to provide users with a seamless hotel booking experience. It offers various screens and features to facilitate searching, booking, and managing hotel reservations.

## Screens

### 1. Splash Screen

- Renders a custom animated UI using the React Native Reanimated library.
- Displays for 2.4 seconds upon app launch.

### 2. Home Screen

- Features a header with a welcome title and a notification icon.
- Includes a search card for location, check-in/out dates, and room selection.
- Provides a search button to navigate to the hotels screen.
- Displays popular hotels using a carousel.

### 3. Hotels Screen

- Lists all available hotels.
- Allows users to view hotel details by clicking on a hotel.

### 4. Hotel Detail Screen

- Shows the hotel banner picture and relevant hotel data.
- Displays hotel features and amenities.
- Provides options to edit check-in/out timing and room details.
- Shows hotel photos and descriptions.
- Allows users to select a room and proceed to booking.

### 5. Select Room Screen

- Allows users to edit check-in/out timing and room details.
- Displays room options for selection.
- Provides a continue button to proceed to the confirmation screen.

### 6. Confirm Screen

- Displays hotel details along with user input details.
- Shows check-in/out timing and a price summary.
- Includes a form for traveler details.
- Requires users to fill out the form before confirming the booking.

### 7. Photos Screen

- Opens when users click on the "View all" button on the hotel details screen.
- Displays hotel photos.
- Allows users to view photos in full-screen mode.

### 8. Notifications Screen

- Currently does not have any data available.

## Technologies Used

- React Native: Framework for building cross-platform mobile applications.
- React Navigation: Library for implementing navigation in React Native apps.
- React Native Reanimated: Library for creating fluid and interactive animations.

## Libraries Used

- **@react-native-async-storage/async-storage**: AsyncStorage library for storing data asynchronously in React Native apps.
- **@react-navigation/native**: Core navigation library for React Native apps.
- **@react-navigation/native-stack**: Stack-based navigation library for React Native apps.
- **@reduxjs/toolkit**: Toolkit for efficient Redux development, providing utilities to simplify Redux code.
- **deprecated-react-native-prop-types**: Library for handling deprecated React Native prop types.
- **moment**: Library for parsing, validating, manipulating, and formatting dates in JavaScript.
- **react**: React library for building user interfaces.
- **react-native**: Core React Native library for building mobile apps.
- **react-native-calendar-picker**: Calendar picker component for React Native apps.
- **react-native-reanimated**: Library for creating fluid and interactive animations in React Native apps.
- **react-native-safe-area-context**: Library for handling safe area insets in React Native apps.
- **react-native-screens**: Library for managing screens in React Native apps.
- **react-native-snap-carousel**: Carousel component for React Native apps.
- **react-native-toast-message**: Library for displaying toast messages in React Native apps.
- **react-redux**: Redux bindings for React, enabling the use of Redux state in React components.

## Future Enhancements

- Integration with backend services for real-time hotel data.
- Personalized recommendations based on user preferences.
- Support for additional languages and currencies.
