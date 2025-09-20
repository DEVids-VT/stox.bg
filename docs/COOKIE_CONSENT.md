# Cookie Consent Implementation

## Overview
This implementation provides GDPR-compliant cookie consent for the Stox.bg website with Bulgarian language support and theme integration.

## Components

### 1. Cookie Consent Modal (`components/ui/cookie-consent.tsx`)
- **Bulgarian language interface**
- **Theme-aware styling** (adapts to dark/light themes)
- **Two-step consent process**:
  - Simple accept/reject banner
  - Detailed settings panel
- **Granular cookie controls**:
  - Necessary cookies (always enabled)
  - Analytics cookies (user choice)

### 2. Analytics Wrapper (`components/analytics.tsx`)
- **Google Analytics 4 integration**
- **Consent-aware loading**
- **Opt-out approach** (analytics enabled by default)

### 3. Updated Privacy Policy (`app/legal/page.tsx`)
- **Comprehensive Google Analytics disclosure**
- **Detailed cookie information**
- **GDPR compliance sections**

## Features

### User Experience
- **Non-intrusive banner** appears after 1 second delay
- **Persistent preferences** stored in localStorage
- **Easy preference management** via settings panel
- **Mobile-responsive design**

### Privacy Compliance
- **Opt-out approach** - Analytics enabled by default with easy opt-out
- **Granular control** - Users can disable analytics cookies anytime
- **Transparent disclosure** - Clear information about data collection
- **Easy withdrawal** - Users can change preferences anytime

### Technical Implementation
- **Theme integration** - Follows site's dark/light theme
- **Performance optimized** - Lazy loading of analytics scripts
- **Error handling** - Graceful fallbacks for consent parsing
- **TypeScript support** - Fully typed implementation

## Setup

### 1. Environment Variables
Add your Google Analytics Measurement ID:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Integration
The cookie consent modal is automatically integrated into the main layout (`app/layout.tsx`).

### 3. Customization
- Modify text in `components/ui/cookie-consent.tsx`
- Update privacy policy in `app/legal/page.tsx`
- Adjust styling via Tailwind classes

## Cookie Categories

### Necessary Cookies
- **Theme preferences** (`stox-theme`)
- **Session security** (if applicable)
- **Cannot be disabled** - Required for site functionality

### Analytics Cookies (Google Analytics)
- **`_ga`** - User identification
- **`_ga_*`** - Session state
- **`_gid`** - User/session distinction
- **User controlled** - Enabled by default, can be disabled

## Compliance Notes

### GDPR Requirements Met
- ✅ **Transparent processing** - Clear disclosure of analytics usage
- ✅ **Clear information** - Detailed privacy policy disclosure
- ✅ **Easy withdrawal** - Settings accessible via banner
- ✅ **Granular choice** - Separate opt-out for different cookie types
- ✅ **Data minimization** - Only necessary and analytics cookies

### Best Practices
- **Opt-out approach** - Analytics enabled by default with clear opt-out
- **Transparent communication** - Clear, jargon-free language
- **User control** - Easy preference management
- **Regular updates** - Privacy policy includes update procedures

## Future Enhancements

### Potential Additions
- **Cookie preference center** in header/footer
- **Advanced analytics controls** (e.g., IP anonymization settings)
- **Additional cookie categories** (marketing, functional)
- **Consent renewal** after policy updates
- **A/B testing** for consent rates

### Integration Opportunities
- **Marketing tools** (when needed)
- **Third-party services** (with separate consent)
- **Advanced analytics** (heat maps, user recordings)
