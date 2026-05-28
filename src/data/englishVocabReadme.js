export const ENGLISH_VOCAB_README_MARKDOWN = `# Vocab App - English Vocabulary Learning

A mobile app built with Expo that helps users learn English vocabulary through image recognition using Google Vision API, translation, and text-to-speech features.

## Features

- **Camera Recognition**: Take photos or select from gallery to identify English words and objects
- **Translation**: Automatic translation from English to Chinese using Google Translate API
- **Text-to-Speech**: Pronunciation playback using Google TTS API
- **Word Management**: Save, organize, and manage learned vocabulary
- **Categories**: Organize words into custom categories
- **Search & Filter**: Find words quickly with search and category filters
- **Dark/Light Theme**: Switch between themes
- **Offline Storage**: All data stored locally using AsyncStorage

## Project Structure

\`\`\`
vocab-app/
├── App.js                               # Main app component
├── components/
│   └── WordCard.js                      # Reusable word display component
├── constants/
│   ├── colors.js                        # Theme colors and styling
│   └── strings.js                       # App text and translations
├── hooks/
│   └── useTheme.js                      # Theme management hook
├── navigation/
│   └── BottomTabs.js                    # Bottom tab navigation
├── screens/
│   ├── CameraScreen.js                  # Camera and image recognition
│   ├── HomeScreen.js                    # Home dashboard
│   ├── WordbookScreen.js                # Word management
│   └── SettingsScreen.js                # App settings
├── services/
│   ├── visionService.js                 # Google Vision API integration
│   ├── translateService.js              # Google Translate API integration
│   └── ttsService.js                    # Google TTS API integration
└── storage/
    └── wordbookStorage.js               # Local data storage
\`\`\`

## Usage

### Taking Photos and Learning Words

1. Open the app and go to the **Camera** tab
2. Take a photo or select from gallery
3. The app will automatically detect English words and objects
4. View translations and listen to pronunciations
5. Save interesting words to your wordbook

### Managing Your Wordbook

1. Go to the **Wordbook** tab
2. View all your saved words
3. Use search to find specific words
4. Filter by categories (All, Recent, Favorites)
5. Tap words to hear pronunciation
6. Mark words as favorites
7. Delete words you no longer need

### Customizing Settings

1. Go to the **Settings** tab
2. Switch between light and dark themes
3. Enable/disable notifications
4. Configure audio and vibration settings
5. Export/import your data
6. Clear all data if needed
`;

export const ENGLISH_VOCAB_TUTORIAL_INTRO =
  "This project is one where I serve as a tutor, guiding my junior students. Below is the instruction document.";

export const ENGLISH_VOCAB_TUTORIAL_PDF = "/docs/year-2-mini-project.pdf";
