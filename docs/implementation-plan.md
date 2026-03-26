# Implement Missing Vendor and Courier Screens

This plan covers the development of several missing critical screens for the Vendor and Courier applications to reach marketplace standards.

## Proposed Changes

### [Vendor App]
Summary: Implementing financial tracking, menu management, and store profile settings.

#### [NEW] OrderHistoryScreen.tsx
- Display "Today's Revenue", "Total Orders", and "Canceled Orders".
- List of past orders with status and amount.

#### [NEW] MenuEditorScreen.tsx
- Form to add/edit products (Name, Description, Price, Category).
- Image upload placeholder.

#### [NEW] StoreProfileScreen.tsx
- Manage working hours (Mon-Sun) with time-pickers.
- Edit minimum order amounts and contact info.

---

### [Courier App]
Summary: Implementing earnings tracking, profile management, and shift/zone scheduling.

#### [NEW] CourierWalletScreen.tsx
- Current balance card with "Withdraw" button.
- Weekly earnings bar chart.
- Recent trip history list.

#### [NEW] CourierProfileScreen.tsx
- Edit personal info and vehicle details (Plate, Vehicle Type).
- Log out functionality.

#### [NEW] ShiftSchedulingScreen.tsx
- Horizontal calendar for date selection.
- List of available time slots to book.
- Preferred working zone selector.

#### [NEW] DeliveryIssueModal.tsx
- Bottom sheet for active delivery issues (e.g., "Customer Unreachable").
- "Call Live Support" action.

## Verification Plan

### Manual Verification
1. **Navigation Check**: Ensure all new screens are accessible from the navigation drawers/tabs.
2. **UI Audit**: Verify 16px border radius, #FF4F00 primary color, and premium aesthetic.
3. **Mock Data Flow**: Ensure charts and lists display the mock data correctly.
4. **Form Interaction**: Test input fields and switches.
