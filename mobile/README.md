# 📱 PettahBazaar Mobile App (React Native & Expo)

PettahBazaar Mobile is built with **React Native (0.88)**, **Expo (SDK 58)**, and **Expo Router** to bring Colombo 11's vibrant marketplace straight to Android, iOS, and Web.

---

## 🚀 How to Run the App

Navigate to the project root or the `mobile` directory:

### Option 1: From the Root Directory
```bash
npm run mobile
```

### Option 2: From the `mobile` Directory
```bash
cd mobile
npx expo start
```

### Running on Devices:
1. **On your Physical Phone (Recommended & Easiest)**:
   - Install the **Expo Go** app from Google Play Store (Android) or App Store (iOS).
   - Run `npx expo start` in your terminal.
   - Scan the QR code with your phone camera (iOS) or the Expo Go app (Android).
   - The app will instantly load on your phone!

2. **On Web**:
   ```bash
   cd mobile
   npx expo start --web
   ```

3. **On Android Emulator**:
   ```bash
   cd mobile
   npx expo start --android
   ```

4. **On iOS Simulator (macOS)**:
   ```bash
   cd mobile
   npx expo start --ios
   ```

---

## 🌟 Key Features

1. **Bazaar Home Screen (`(tabs)/index.tsx`)**:
   - Live Bazaar Open indicator for Colombo 11
   - Real-time search across products, shops, and stall numbers
   - Instant street filter: *Main Street, 1st Cross St, 2nd Cross St, Keyzer St, Maliban St*
   - Category filter: *Shoes, Electronics, Clothing, Bags, Watches, Accessories*
   - 2-Column responsive grid with prices in LKR, discount badges, and stock indicators

2. **Pettah Merchants & Stalls (`(tabs)/shops.tsx`)**:
   - Directory of verified Pettah sellers
   - Stall numbers, addresses, opening hours, and specialties
   - **Direct Call** and **Direct WhatsApp** buttons with pre-filled messages
   - "Products" button to quickly view all items sold by that shop

3. **Bazaar Bag & WhatsApp Order Checkout (`(tabs)/cart.tsx`)**:
   - Manage cart items with selected size and color
   - Fulfillment selector: *Stall Pickup (Free)* vs *Courier Delivery (+Rs. 450)*
   - **Send Order to WhatsApp**: Formats a professional Sri Lankan bazaar order message with items, quantities, stall details, and total amount, opening WhatsApp directly to the merchant!

4. **Pettah Street Navigator & Guide (`(tabs)/guide.tsx`)**:
   - Detailed guide to famous Pettah streets (*Main St, Cross Streets, Keyzer St, Maliban St, Sea St*)
   - Proximity to Colombo Fort Railway Station and Central Bus Stand
   - Practical bazaar shopping tips: best visiting hours, bargaining tips, and payment options

5. **Product Detail Page (`product/[id].tsx`)**:
   - Full image gallery
   - Interactive size chips & color selector swatches
   - Merchant Stall Card with live distance from Pettah Clock Tower
   - Direct WhatsApp inquiry & Add to Bag actions
