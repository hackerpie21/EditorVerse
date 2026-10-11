# Build EditorVerse APK from your phone

This project is configured to build a **debug APK** with GitHub Actions. The ZIP itself is source code, not an APK.

## 1. Upload the project to GitHub
1. Open https://github.com/new and create a repository named `EditorVerse`.
2. Extract this ZIP on your phone.
3. Upload the contents of the `editorverse` folder to the repository root. Make sure `.github/workflows/android-apk.yml` is included. Some mobile file managers hide dot-folders, so verify the workflow appears on GitHub.

## 2. Run the cloud build
1. Open your repository on GitHub.
2. Tap **Actions** and enable workflows if asked.
3. Select **Build EditorVerse APK** and tap **Run workflow**. A push to main/master also triggers it.
4. Wait for the run to finish with a green check mark.
5. Open that run and download the **EditorVerse-debug-apk** artifact. GitHub may download it as a ZIP; extract it to get `app-debug.apk`.
6. Open the APK on your Android phone and allow installation from that source if Android asks.

## Backend limitation
The APK contains the React frontend. The Express/SQLite backend is not embedded in the APK and does not automatically become an online server. Until you deploy the backend and configure a reachable API URL, the app mainly uses its demo fallback content. Local SQLite/file storage on a temporary server is not suitable for production. Before public release, add authentication, secure uploads, cloud file storage, and a production database.

## If the build fails
Open the failed GitHub Actions run and read the first red error. Common causes include missing workflow files, dependency/version conflicts, or Android Gradle build errors. The uploaded APK is a debug build for testing, not a signed Play Store release.
