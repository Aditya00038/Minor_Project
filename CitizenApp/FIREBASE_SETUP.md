# Firebase Setup Guide for OTP Authentication

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Enter project name (e.g., "CitizenApp")
4. Click "Continue" and follow the prompts

## Step 2: Add Android App to Firebase

1. In Firebase Console, click the Android icon
2. **Android package name**: `com.citizenapp` (must match your app)
3. Click "Register app"
4. Download `google-services.json`
5. Place it in: `android/app/google-services.json`

## Step 3: Enable Phone Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started" (if first time)
3. Go to **Sign-in method** tab
4. Click on **Phone** provider
5. Click **Enable** toggle
6. Click **Save**

## Step 4: Configure Android Project

### 4.1: Update `android/build.gradle`

Add this to dependencies section:
```gradle
buildscript {
    dependencies {
        // Add this line
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

### 4.2: Update `android/app/build.gradle`

Add at the BOTTOM of the file:
```gradle
apply plugin: 'com.google.gms.google-services'
```

## Step 5: Update Firebase Config

1. Open `src/config/firebase.js`
2. In Firebase Console, go to Project Settings (gear icon)
3. Scroll down to "Your apps" section
4. Copy the config values and replace in `firebase.js`

## Step 6: Rebuild the App

```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Important Notes

⚠️ **For Testing:**
- Phone authentication requires a real device (not emulator)
- You need to add test phone numbers in Firebase Console for testing
- Go to: Authentication > Sign-in method > Phone > Phone numbers for testing

📱 **Add Test Numbers:**
1. In Firebase Console: Authentication > Sign-in method > Phone
2. Scroll to "Phone numbers for testing"
3. Add: +91 1234567890 with code: 123456
4. Use these for testing without sending real SMS

🔐 **Production:**
- Enable Google Play Integrity / SafetyNet in Firebase Console
- Verify SHA-256 certificate fingerprint is added
- Test with real phone numbers

## Troubleshooting

**Error: "missing google-services.json"**
- Make sure `google-services.json` is in `android/app/` folder

**Error: "Phone number verification failed"**
- Check internet connection
- Verify phone auth is enabled in Firebase
- Use test phone numbers for development

**Build errors:**
- Run `cd android && ./gradlew clean`
- Delete `android/build` folder
- Rebuild: `npm run android`
