# FusionSpace App

This is Collborative and Sharing Posts Application. This allow users to share posts in public and communities. User can create own communties. User can follow others and joins different communities.

## 🔥 Tech Stack

**Frontend**

- Developed Using React, Javascript
- State management with Context API
- API Calls using Axios
- Authentication with login/register funcationality
- UI state handling (loading, error, success)

**Backend**

- Built Using Node.js, Express, MongoDB
- Secure password hashing with bcryptjs
- Middleware for authentication and error handling
- Modular controller and route structure
- MongoDB database connnection using Mongoose

---

## ⚙️ Installation Steps

**Prerequisites**

Ensure you have **Node.js** installed.

Installation

```
git clone <repo-url>
npm install
```

**Configure Environment Variables**

Create a `.env` file in the directory and add the following. Put you values:

```
# If backend is running locally
VITE_API_URL="backend-url"

VITE_API_RENDER_URL="remote-backend-url"
```

**Run the App**

```
npm run dev
```

---

## 🎨 Design and Pages

### 🌐 Desktop Pages

| Home Page | Trending Page |
|----------|---------------|
| <img src="./public/home-page.png" alt="Home Page" width="400" /> | <img src="./public/trending-page.png" alt="Trending Page" width="400" /> |

| Community Page | Profile Page |
|---------------|--------------|
| <img src="./public/community-page.png" alt="Community Page" width="400" /> | <img src="./public/profile-page.png" alt="Profile Page" width="400" /> |

| Search Page | Post Page |
|------------|-----------|
| <img src="./public/search-page.png" alt="Search Page" width="400" /> | <img src="./public/post-page.png" alt="Post Page" width="400" /> |

---

### 🔐 Form Pages

| Login Form | Signup Form |
|-----------|-------------|
| <img src="./public/login-form.png" alt="Login Form" width="400" /> | <img src="./public/signup-form.png" alt="Signup Form" width="400" /> |

| Post Form | Community Form |
|----------|----------------|
| <img src="./public/post-form.png" alt="Post Form" width="400" /> | <img src="./public/community-form.png" alt="Community Form" width="400" /> |

---

### 📱 Mobile Pages (Desktop View: 3 per row)

| Mobile Feed Page | Mobile Explore Page | Mobile Create Post |
|------------------|--------------------|--------------------|
| <img src="./public/mobile-feed-page.png" alt="Mobile Feed Page" width="250" /> | <img src="./public/mobile-explore-page.png" alt="Mobile Explore Page" width="250" /> | <img src="./public/mobile-create-post.png" alt="Mobile Create Post" width="250" /> |

| Mobile Community Page | Mobile Profile Page | Mobile Post Page |
|----------------------|--------------------|------------------|
| <img src="./public/mobile-community-page.png" alt="Mobile Community Page" width="250" /> | <img src="./public/mobile-profile-page.png" alt="Mobile Profile Page" width="250" /> | <img src="./public/mobile-post-page.png" alt="Mobile Post Page" width="250" /> |

---

## Features Implements

    User Creation
    Post Creation
    Follow / Unfollow Users
    Create, Join, Delete Communities
    Like, Comment Posts
    Dark / Light Modes
    Search Users, Communities

---

## 🚀 Future Improvements

    Refresh token mechanism
    Chat Implementation
    OAuth (Google, GitHub) authentication
    Profile management (edit profile, upload avatars)
    Toast Notification
    Update Community

---

## Collaboration and contributions

    Feel Free to clone and use repo.
    Suggestions are accepted.

---

## 📝 License

This project is open-source and available under the MIT License.
