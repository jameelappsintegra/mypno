# My PNO
You need to install with theses commanad npm install or yarn install
You need to run yarn start after install 

## Rules Firebase

```
service cloud.firestore {
  match /databases/{database}/documents {
		match /projects/{project}{
			allow read, write : if request.auth.uid != null
		}
		match /users/{userId}{
			allow create
			allow read: if request.auth.uid != null
			allow write: if request.auth.uid == userId
		}
  }
}
```
