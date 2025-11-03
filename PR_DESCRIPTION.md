# Add Loading Spinners to Network Requests

## 📝 Description
This PR adds visual loading spinners to all network request buttons throughout the application to improve user feedback and experience during network delays. Users will now see animated spinners and descriptive text (e.g., "Loading...", "Verifying...") whenever a network request is in progress, making it clear that the application is processing their action.

## 🔗 Linked Issues
Closes #31

## 🧪 Type of Change
- [x] ✨ New feature (non-breaking change which adds functionality)
- [x] 🎨 Style update (formatting, renaming)

## 🔄 Changes Made

### New Component Created
- **LoadingSpinner.jsx** - Reusable animated spinner component with Framer Motion
  - Supports three sizes (small, medium, large)
  - Customizable loading messages
  - Purple-themed design matching application style

### Components Enhanced with Loading Indicators

1. **SignUp.jsx**
   - Added spinner to signup button during account creation
   - Shows rotating icon + "Creating Account..." text
   - Button disabled during loading to prevent duplicate submissions
   - Works for both standard signup and Google OAuth

2. **SignIn.jsx**
   - Added spinner to signin button during authentication
   - Shows rotating icon + "Signing In..." text
   - Button disabled during loading

3. **Verify.jsx**
   - Added spinner to verify button during certificate verification
   - Shows rotating icon + "Verifying..." text
   - Button disabled during loading

4. **Generate.jsx**
   - Added spinner to generate button during certificate generation
   - Shows rotating icon + "Generating..." text
   - Added loading state for fetching uploaded images on component mount
   - Shows LoadingSpinner component while image is loading

5. **Newsletter.jsx**
   - Added spinner to subscribe button during newsletter subscription
   - Shows rotating icon + "Subscribing..." text
   - Maintains beautiful animation effects during loading

## 📷 Screenshots (if applicable)

### Before
Buttons showed static text during loading with no visual feedback

### After
Buttons show animated spinner with descriptive loading text:
- Sign Up: ⟳ Creating Account...
- Sign In: ⟳ Signing In...
- Verify: ⟳ Verifying...
- Generate: ⟳ Generating...
- Subscribe: ⟳ Subscribing...

## 🧪 Testing

- [x] I have tested the changes locally
- [x] All existing tests pass
- [x] I have tested on multiple browsers (if frontend changes)

### Test Cases

1. **SignUp Component**
   - Tested standard email/password signup flow
   - Verified spinner appears during account creation
   - Confirmed button is disabled during loading
   - Tested Google OAuth signup flow

2. **SignIn Component**
   - Tested login with valid credentials
   - Verified spinner appears during authentication
   - Confirmed button is disabled during loading
   - Tested Google OAuth signin flow

3. **Verify Component**
   - Tested certificate verification with valid ID
   - Verified spinner appears during verification
   - Confirmed button is disabled during loading

4. **Generate Component**
   - Tested certificate generation
   - Verified spinner appears during generation
   - Confirmed image loading spinner on component mount
   - Tested with uploaded background images

5. **Newsletter Component**
   - Tested newsletter subscription
   - Verified spinner appears during subscription
   - Confirmed button animations work properly with spinner

6. **Slow Network Testing**
   - Throttled network speed to simulate delays
   - Confirmed spinners remain visible during entire request duration
   - Verified spinners disappear after request completion

## 📋 Checklist

- [x] My code follows the project's style guidelines
- [x] I have performed a self-review of my code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] My changes generate no new warnings
- [x] New and existing unit tests pass locally with my changes
- [x] Any dependent changes have been merged and published in downstream modules

## 📝 Additional Notes

### Implementation Details
- **No Logic Changes**: All existing loading states and async/await patterns were preserved
- **Consistent Design Pattern**: All spinners follow the same design pattern for consistency
- **Accessibility**: Visual feedback provides clear indication of processing state
- **Performance**: Lightweight animations using Tailwind CSS and Framer Motion
- **Maintainability**: Created reusable LoadingSpinner component for future use

### Technical Approach
```jsx
// Pattern used across all components
{loading ? (
  <div className="flex items-center justify-center gap-2">
    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Loading Text...</span>
  </div>
) : "Normal Button Text"}
```

### Benefits
1. **Better UX**: Users receive immediate visual feedback
2. **Professional Appearance**: Modern loading indicators enhance app quality
3. **Error Prevention**: Disabled buttons prevent duplicate submissions
4. **User Confidence**: Clear indication that the app is working
5. **Consistent Experience**: Same pattern across all network requests

## 🤝 Contribution Guidelines

- [x] I have read and followed the project's contributing guidelines
- [x] I have checked that my PR doesn't duplicate an existing one
- [x] I have ensured my branch is up to date with the main branch
- [x] I agree to follow the project's Code of Conduct

---

**Thank you for reviewing! 🚀**
