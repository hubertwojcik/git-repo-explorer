# GitHub Finder App

Welcome to the GitHub Finder App! This application is designed to help users easily search for and find GitHub users. The app is built using React Native and a suite of powerful libraries to enhance performance and user experience.

## Features

- **User Search**: Find users on GitHub by searching for their username.
- **User Profiles**: View details of GitHub users including their repositories, followers, and more.
- **Smooth Animations**: Enhanced user experience with animations using React Native Reanimated and Lottie.
- **Data Caching**: Efficiently cache data with TanStack Query to provide a smooth and fast experience.
- **Local Storage**: Persist user data locally using Async Storage.

## Tech Stack

- **React Native Expo**: The core framework used to build the app.
- **TanStack Query**: For data fetching, caching, synchronization, and more.
- **React Native Reanimated**: Used for smooth and performant animations.
- **Async Storage**: For local storage of user data and preferences. (MMKV would be used in a non-Expo environment)
- **Lottie**: To add delightful animations to the app.
- **Zod**: For validation of environment variables ensuring correct app configuration.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/github-finder-app.git
   cd github-finder-app
   ```

2. **Install dependencies:**

   ```
       npm install
   ```

3. **Run the app:**
   This will start the Expo development server. You can scan the QR code with the Expo Go app on your mobile device to run the app.
   ```
       npx expo start
   ```
