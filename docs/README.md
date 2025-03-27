# Versailles Restaurant Queue System Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Information Architecture](#information-architecture)
3. [UX/UI Process](#uxui-process)
4. [Technical Implementation](#technical-implementation)
5. [Screens](#screens)
6. [Components](#components)
7. [State Management](#state-management)
8. [Internationalization](#internationalization)
9. [Theme System](#theme-system)

## Project Overview

The Versailles Restaurant Queue System is a modern, digital queue management solution designed for the iconic Versailles Restaurant. It provides a seamless experience for customers to join a virtual queue and for staff to manage seating efficiently.

### Key Features
- Virtual queue management
- Real-time queue status updates
- Bilingual support (English/Spanish)
- Digital menu browsing
- Table readiness notifications
- Administrative queue control
- Theme customization
- Mobile-responsive design

## Information Architecture

```
[Application]
├── [Views]
│   ├── CustomerView
│   │   ├── Join Queue Form
│   │   ├── Queue Status
│   │   │   ├── Position Display
│   │   │   ├── Wait Time
│   │   │   └── Digital Menu
│   │   └── Table Ready Notification
│   └── AdminView
│       └── Queue Management
│           ├── Customer List
│           ├── Seating Controls
│           └── Queue Statistics
├── [Context]
│   ├── QueueContext
│   │   ├── Customer Data
│   │   └── Menu Items
│   ├── LanguageContext
│   │   ├── English
│   │   └── Spanish
│   └── ThemeContext
│       └── Theme Variables
└── [Components]
    ├── Shared
    │   ├── VersaillesLogo
    │   └── LanguageSwitcher
    └── Forms
        └── CustomerForm
```

## UX/UI Process

### Design Philosophy
The design follows the elegant and traditional aesthetic of Versailles Restaurant while providing a modern digital experience.

### Color Palette
- Primary: `#1B4332` (Versailles forest green)
- Secondary: `#C5A572` (Versailles gold)
- Accent: `#2D6A4F` (Lighter green)
- Background: `#FFFDF9` (Warm white)
- Text: `#2A2A2A` (Rich black)

### Typography
- Headers: Playfair Display (Serif)
- Body: Lato (Sans-serif)

### Design Principles
1. **Clarity**: Clear hierarchy and intuitive navigation
2. **Elegance**: Sophisticated visual elements reflecting brand heritage
3. **Responsiveness**: Fluid layouts adapting to all device sizes
4. **Accessibility**: High contrast and readable text
5. **Feedback**: Clear system status indicators

## Technical Implementation

### Tech Stack
- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Key Features Implementation

#### Queue Management
```typescript
interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  partySize: number;
  joinedAt: Date;
  status: 'waiting' | 'seated' | 'cancelled';
  estimatedWaitTime?: number;
  tableAssigned?: string;
  tableCode?: string;
}
```

#### Theme System
```typescript
interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}
```

## Screens

### Customer View - Join Queue
![Customer Join Queue](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000)

Key elements:
- Restaurant logo
- Language switcher
- Join queue form
- Brand messaging

### Queue Status View
![Queue Status](https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=1000)

Features:
- Position in queue
- Estimated wait time
- Digital menu browser
- Party details

### Admin View
![Admin Dashboard](https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000)

Capabilities:
- Queue management
- Customer status updates
- Seating controls
- Queue statistics

## Components

### Core Components
1. **CustomerForm**
   - Input validation
   - Phone number formatting
   - Party size limits
   - Themed styling

2. **QueueStatus**
   - Real-time position updates
   - Wait time estimation
   - Digital menu integration
   - Status notifications

3. **AdminQueue**
   - Customer list management
   - Status control buttons
   - Queue statistics display

4. **LanguageSwitcher**
   - Language toggle
   - Animated icon
   - Themed styling

### Shared Components
1. **VersaillesLogo**
   - SVG implementation
   - Theme integration
   - Responsive sizing

## State Management

### Context Structure
- QueueContext: Manages queue state and operations
- LanguageContext: Handles internationalization
- ThemeContext: Controls theme variables

### Data Flow
```
[QueueContext]
     │
     ├── [CustomerView]
     │    ├── CustomerForm
     │    └── QueueStatus
     │
     └── [AdminView]
          └── AdminQueue
```

## Internationalization

The system supports English and Spanish languages through the LanguageContext:

```typescript
interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}
```

Key translation categories:
- Form labels
- Status messages
- Menu items
- System notifications

## Theme System

The theme system provides consistent styling across components:

```typescript
const defaultTheme: Theme = {
  primary: '#1B4332',    // Versailles forest green
  secondary: '#C5A572',  // Versailles gold
  accent: '#2D6A4F',     // Lighter green
  background: '#FFFDF9', // Warm white
  text: '#2A2A2A',       // Rich black
};
```

### Theme Integration
- Component-level styling
- Dynamic color updates
- Consistent brand identity
- Accessible color combinations

## Future Enhancements
1. SMS notifications
2. Table assignment automation
3. Historical data analytics
4. Customer feedback system
5. Staff management interface