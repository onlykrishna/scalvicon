# Chatbot Removal Guide

If you ever need to completely remove the AI Chatbot feature from the platform, follow these steps to ensure a clean removal with zero breakage to the rest of the site.

### 1. Delete the feature folder
Delete the entire directory: `src/features/chatbot/`

### 2. Remove from App.tsx
Delete the import line:
```ts
import ChatWidget from './features/chatbot';
```
Delete the JSX component from the return statement:
```tsx
<ChatWidget />
```

### 3. Clean up Cloud Functions
Open `functions/src/index.ts` and delete the `scalviconChatbot` cloud function (found at the bottom of the file).
Deploy the changes to remove it from Firebase:
```sh
cd functions
npm run build
firebase deploy --only functions
```

### 4. Firestore Cleanup
Archive (do not delete) the following collections in your Firebase console:
- `chat_conversations`
- `chat_leads`

Open `firestore.rules` and delete the "Chatbot" section added for the above collections.
Deploy the rules:
```sh
firebase deploy --only firestore:rules
```

Total estimated removal time: < 5 minutes.
