import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { LoginEntry } from './pages/LoginEntry';
import { Login } from './pages/Login';
import { BusinessLogin } from './pages/BusinessLogin';
import { BusinessRegister } from './pages/BusinessRegister';
import { AdminLogin } from './pages/AdminLogin';
import { SuperAdminLogin } from './pages/SuperAdminLogin';
import { SignUp } from './pages/SignUp';
import { EmailVerification } from './pages/EmailVerification';
import { RoleSelection } from './pages/RoleSelection';
import { CustomerOnboarding } from './pages/CustomerOnboarding';
import { VendorOnboarding } from './pages/VendorOnboarding';
import { PlannerOnboarding } from './pages/PlannerOnboarding';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Preferences } from './pages/Preferences';
import { OnboardingComplete } from './pages/OnboardingComplete';

// Customer Module
import { CustomerLayout } from './layouts/CustomerLayout';
import { Dashboard } from './pages/customer/Dashboard';
import { Events } from './pages/customer/Events';
import { CreateEvent } from './pages/customer/CreateEvent';
import { CreateEventEnhanced } from './pages/customer/CreateEventEnhanced';
import { EventOverview } from './pages/customer/EventOverview';
import { EventOverviewEnhanced } from './pages/customer/EventOverviewEnhanced';
import { EventPayments } from './pages/customer/EventPayments';
import { AttendanceConfirmation } from './pages/customer/AttendanceConfirmation';
import { Guests } from './pages/customer/Guests';
import { AddGuests } from './pages/customer/AddGuests';
import { VendorMarketplace } from './pages/customer/VendorMarketplace';
import { VendorProfile } from './pages/customer/VendorProfile';
import { PostRequirement } from './pages/customer/PostRequirement';
import { RequirementDetails } from './pages/customer/RequirementDetails';
import { BidsList as CustomerBidsList } from './pages/customer/BidsList';
import { BidDetail as CustomerBidDetail } from './pages/customer/BidDetail';
import { BidComparison } from './pages/customer/BidComparison';
import { Messages } from './pages/customer/Messages';
import { ChatDetail } from './pages/customer/ChatDetail';
import { Agreements } from './pages/customer/Agreements';
import { AgreementViewer } from './pages/customer/AgreementViewer';
import { Notifications } from './pages/customer/Notifications';
import { Settings } from './pages/customer/Settings';
import { Vendors } from './pages/customer/Vendors';
import { EventVendorSelection } from './pages/customer/EventVendorSelection';
import { EventVendorSelectionEnhanced } from './pages/customer/EventVendorSelectionEnhanced';
import { EventVendorProfile } from './pages/customer/EventVendorProfile';
import { EventVendorProfileEnhanced } from './pages/customer/EventVendorProfileEnhanced';
import { EventBidsList } from './pages/customer/EventBidsList';
import { EventBidDetail } from './pages/customer/EventBidDetail';
import { EventGuests } from './pages/customer/EventGuests';
import { EventPaymentsDetail } from './pages/customer/EventPaymentsDetail';
import { EventAgreements } from './pages/customer/EventAgreements';
import { EventExecution } from './pages/customer/EventExecution';
import { CustomerDashboardMain } from './pages/customer/CustomerDashboardMain';
import { EventGuestsEnhanced } from './pages/customer/EventGuestsEnhanced';
import { EventPaymentsEnhanced } from './pages/customer/EventPaymentsEnhanced';
import { EventAgreementsEnhanced } from './pages/customer/EventAgreementsEnhanced';
import { EventExecutionEnhanced } from './pages/customer/EventExecutionEnhanced';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { GlobalVendors } from './pages/customer/GlobalVendors';
import { EventPlanners } from './pages/customer/EventPlanners';
import { GlobalGuests } from './pages/customer/GlobalGuests';
import { Support } from './pages/customer/Support';
import { Payments } from './pages/customer/Payments';
import { Invitations } from './pages/customer/Invitations';
import { EventPlannerProfile } from './pages/customer/EventPlannerProfile';

// Agreements Module
import { EventAgreements as EventAgreementsNew } from './pages/customer/agreements/EventAgreements';
import { AgreementsList as AgreementsListNew } from './pages/customer/agreements/AgreementsList';
import { AddAgreement } from './pages/customer/agreements/AddAgreement';
import { AgreementDetail as AgreementDetailNew } from './pages/customer/agreements/AgreementDetail';

// Rental Services Module
import {
  RentalServices,
  EventRentals,
  RentalItemsListing,
  RentalItemDetail,
  RentalBooking,
  RentalSummary,
  ActiveRentals,
} from './pages/customer/rentals';

// Invitation Module
import { InvitationDashboard } from './pages/customer/invitations/InvitationDashboard';
import { CreateInvitationChoice } from './pages/customer/invitations/CreateInvitationChoice';
import { TemplateSelection } from './pages/customer/invitations/TemplateSelection';
import { TemplateEditor } from './pages/customer/invitations/TemplateEditor';
import { UploadInvitation } from './pages/customer/invitations/UploadInvitation';
import { InvitationDetail } from './pages/customer/invitations/InvitationDetail';
import { SendInvitation } from './pages/customer/invitations/SendInvitation';

// Admin Module
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SuperAdminDashboard } from './pages/admin/SuperAdminDashboard';
import { CustomersList } from './pages/admin/CustomersList';
import { CustomerDetail } from './pages/admin/CustomerDetail';
import { VendorsList } from './pages/admin/VendorsList';
import { VendorDetail } from './pages/admin/VendorDetail';
import { RequirementsList } from './pages/admin/RequirementsList';
import { RequirementDetail as AdminRequirementDetail } from './pages/admin/RequirementDetail';
import { BidsList } from './pages/admin/BidsList';
import { BidDetail } from './pages/admin/BidDetail';
import { DisputesList } from './pages/admin/DisputesList';
import { DisputeDetail } from './pages/admin/DisputeDetail';
import { AgreementsList } from './pages/admin/AgreementsList';
import { AgreementDetail } from './pages/admin/AgreementDetail';
import { PaymentsMonitoring } from './pages/admin/PaymentsMonitoring';
import { FinancialDashboard } from './pages/admin/FinancialDashboard';
import { ReportsDashboard } from './pages/admin/ReportsDashboard';
import { SupportTickets } from './pages/admin/SupportTickets';
import { SystemSettings } from './pages/admin/SystemSettings';

// Vendor Module
import { VendorLayout } from './layouts/VendorLayout';
import { VendorDashboard as VendorDashboardPage } from './pages/vendor/VendorDashboard';
import { RequirementsFeed } from './pages/vendor/RequirementsFeed';
import { RequirementDetail } from './pages/vendor/RequirementDetail';
import { PlaceBid } from './pages/vendor/PlaceBid';
import { MyBids } from './pages/vendor/MyBids';
import { BidDetail as VendorBidDetail } from './pages/vendor/BidDetail';
import { AwardedEvents } from './pages/vendor/AwardedEvents';
import { EventDetail } from './pages/vendor/EventDetail';
import { VendorMessages } from './pages/vendor/VendorMessages';
import { Deliverables } from './pages/vendor/Deliverables';
import { VendorEarnings } from './pages/vendor/VendorEarnings';
import { VendorInvoices } from './pages/vendor/VendorInvoices';
import { InvoiceDetail } from './pages/vendor/InvoiceDetail';
import { VendorAttendance } from './pages/vendor/VendorAttendance';
import { VendorAds } from './pages/vendor/VendorAds';
import { AdDetail } from './pages/vendor/AdDetail';
import { VendorSupport } from './pages/vendor/VendorSupport';
import { TicketDetail } from './pages/vendor/TicketDetail';
import { VendorProfile as VendorProfilePage } from './pages/vendor/VendorProfile';
import { Portfolio } from './pages/vendor/Portfolio';
import { Packages } from './pages/vendor/Packages';
import { VendorAvailability } from './pages/vendor/VendorAvailability';
import { VendorSettings } from './pages/vendor/VendorSettings';

// Planner Module
import { PlannerLayout } from './layouts/PlannerLayout';
import { PlannerDashboard } from './pages/planner/PlannerDashboard';
import { PlannerEvents } from './pages/planner/PlannerEvents';
import { PlannerVendors } from './pages/planner/PlannerVendors';
import { PlannerBids } from './pages/planner/PlannerBids';
import { PlannerPayments } from './pages/planner/PlannerPayments';
import { PlannerInvitations } from './pages/planner/PlannerInvitations';
import { PlannerAttendance } from './pages/planner/PlannerAttendance';
import { PlannerSupport } from './pages/planner/PlannerSupport';
import { PlannerSettings } from './pages/planner/PlannerSettings';

// Error Boundary
import { RouteErrorElement } from './components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/results',
    Component: ResultsPage,
  },
  {
    path: '/login-entry',
    Component: LoginEntry,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/business/login',
    Component: BusinessLogin,
  },
  {
    path: '/business/register',
    Component: BusinessRegister,
  },
  {
    path: '/admin/login',
    Component: AdminLogin,
  },
  {
    path: '/super-admin/login',
    Component: SuperAdminLogin,
  },
  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/email-verification',
    Component: EmailVerification,
  },
  {
    path: '/role-selection',
    Component: RoleSelection,
  },
  {
    path: '/customer-onboarding',
    Component: CustomerOnboarding,
  },
  {
    path: '/vendor-onboarding',
    Component: VendorOnboarding,
  },
  {
    path: '/planner-onboarding',
    Component: PlannerOnboarding,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/reset-password',
    Component: ResetPassword,
  },
  {
    path: '/preferences',
    Component: Preferences,
  },
  {
    path: '/onboarding-complete',
    Component: OnboardingComplete,
  },
  {
    path: '/customer',
    Component: CustomerLayout,
    children: [
      {
        index: true,
        Component: CustomerDashboard,
      },
      {
        path: 'dashboard',
        Component: CustomerDashboard,
      },
      {
        path: 'events',
        Component: Events,
      },
      {
        path: 'events/create',
        Component: CreateEventEnhanced,
      },
      {
        path: 'events/create-enhanced',
        Component: CreateEventEnhanced,
      },
      {
        path: 'events/:id',
        Component: EventOverviewEnhanced,
      },
      {
        path: 'events/:id/enhanced',
        Component: EventOverviewEnhanced,
      },
      {
        path: 'events/:id/payments',
        Component: EventPayments,
      },
      {
        path: 'events/:id/attendance-confirmation',
        Component: AttendanceConfirmation,
      },
      {
        path: 'guests',
        Component: Guests,
      },
      {
        path: 'guests/add',
        Component: AddGuests,
      },
      {
        path: 'vendors',
        Component: Vendors,
      },
      {
        path: 'vendors/marketplace',
        Component: VendorMarketplace,
      },
      {
        path: 'vendors/:id',
        Component: VendorProfile,
      },
      {
        path: 'vendors/post-requirement',
        Component: PostRequirement,
      },
      {
        path: 'requirements/:id',
        Component: RequirementDetails,
      },
      {
        path: 'requirements/:id/bids',
        Component: CustomerBidsList,
      },
      {
        path: 'requirements/:id/bids/:bidId',
        Component: CustomerBidDetail,
      },
      {
        path: 'requirements/:id/compare',
        Component: BidComparison,
      },
      {
        path: 'messages',
        Component: Messages,
      },
      {
        path: 'messages/:id',
        Component: ChatDetail,
      },
      {
        path: 'agreements',
        Component: Agreements,
      },
      {
        path: 'agreements/:id',
        Component: AgreementViewer,
      },
      {
        path: 'notifications',
        Component: Notifications,
      },
      {
        path: 'settings',
        Component: Settings,
      },
      {
        path: 'events/:id/vendor-selection',
        Component: EventVendorSelectionEnhanced,
      },
      {
        path: 'events/:id/vendor-profile/:vendorId',
        Component: EventVendorProfileEnhanced,
      },
      {
        path: 'events/:id/bids',
        Component: EventBidsList,
      },
      {
        path: 'events/:id/bids/:bidId',
        Component: EventBidDetail,
      },
      {
        path: 'events/:id/guests',
        Component: EventGuests,
      },
      {
        path: 'events/:id/guests-enhanced',
        Component: EventGuestsEnhanced,
      },
      {
        path: 'events/:id/payments-detail',
        Component: EventPaymentsDetail,
      },
      {
        path: 'events/:id/payments-enhanced',
        Component: EventPaymentsEnhanced,
      },
      {
        path: 'events/:id/agreements',
        Component: EventAgreements,
      },
      {
        path: 'events/:id/agreements-enhanced',
        Component: EventAgreementsEnhanced,
      },
      {
        path: 'events/:id/execution',
        Component: EventExecution,
      },
      {
        path: 'events/:id/execution-enhanced',
        Component: EventExecutionEnhanced,
      },
      {
        path: 'dashboard/main',
        Component: CustomerDashboardMain,
      },
      {
        path: 'dashboard',
        Component: CustomerDashboard,
      },
      {
        path: 'global-vendors',
        Component: GlobalVendors,
      },
      {
        path: 'event-planners',
        Component: EventPlanners,
      },
      {
        path: 'event-planners/:id',
        Component: EventPlannerProfile,
      },
      {
        path: 'global-guests',
        Component: GlobalGuests,
      },
      {
        path: 'support',
        Component: Support,
      },
      {
        path: 'payments',
        Component: Payments,
      },
      {
        path: 'invitations',
        Component: Invitations,
      },
      {
        path: 'invitations/:eventId',
        Component: InvitationDashboard,
      },
      {
        path: 'invitations/:eventId/create',
        Component: CreateInvitationChoice,
      },
      {
        path: 'invitations/:eventId/templates',
        Component: TemplateSelection,
      },
      {
        path: 'invitations/:eventId/templates/:templateId/edit',
        Component: TemplateEditor,
      },
      {
        path: 'invitations/:eventId/upload',
        Component: UploadInvitation,
      },
      {
        path: 'invitations/:eventId/:invitationId',
        Component: InvitationDetail,
      },
      {
        path: 'invitations/:eventId/:invitationId/send',
        Component: SendInvitation,
      },
      {
        path: 'agreements-new',
        Component: AgreementsListNew,
      },
      {
        path: 'agreements-new/add',
        Component: AddAgreement,
      },
      {
        path: 'agreements-new/:agreementId',
        Component: AgreementDetailNew,
      },
      {
        path: 'events/:eventId/agreements-new',
        Component: EventAgreementsNew,
      },
      {
        path: 'events/:eventId/agreements-new/add',
        Component: AddAgreement,
      },
      {
        path: 'events/:eventId/agreements-new/:agreementId',
        Component: AgreementDetailNew,
      },
      {
        path: 'rental-services',
        Component: RentalServices,
      },
      {
        path: 'events/:eventId/rentals',
        Component: EventRentals,
      },
      {
        path: 'events/:eventId/rentals/category/:category',
        Component: RentalItemsListing,
      },
      {
        path: 'events/:eventId/rentals/item/:itemId',
        Component: RentalItemDetail,
      },
      {
        path: 'events/:eventId/rentals/item/:itemId/book',
        Component: RentalBooking,
      },
      {
        path: 'events/:eventId/rentals/item/:itemId/summary',
        Component: RentalSummary,
      },
      {
        path: 'events/:eventId/rentals/active',
        Component: ActiveRentals,
      },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: AdminDashboard,
      },
      {
        path: 'dashboard',
        Component: AdminDashboard,
      },
      {
        path: 'superadmin-dashboard',
        Component: SuperAdminDashboard,
      },
      {
        path: 'users',
        Component: CustomersList,
      },
      {
        path: 'users/:id',
        Component: CustomerDetail,
      },
      {
        path: 'vendors',
        Component: VendorsList,
      },
      {
        path: 'vendors/:id',
        Component: VendorDetail,
      },
      {
        path: 'requirements',
        Component: RequirementsList,
      },
      {
        path: 'requirements/:id',
        Component: AdminRequirementDetail,
      },
      {
        path: 'bids',
        Component: BidsList,
      },
      {
        path: 'bids/:id',
        Component: BidDetail,
      },
      {
        path: 'disputes',
        Component: DisputesList,
      },
      {
        path: 'disputes/:id',
        Component: DisputeDetail,
      },
      {
        path: 'agreements',
        Component: AgreementsList,
      },
      {
        path: 'agreements/:id',
        Component: AgreementDetail,
      },
      {
        path: 'payments-monitoring',
        Component: PaymentsMonitoring,
      },
      {
        path: 'financial',
        Component: FinancialDashboard,
      },
      {
        path: 'reports',
        Component: ReportsDashboard,
      },
      {
        path: 'support',
        Component: SupportTickets,
      },
      {
        path: 'settings',
        Component: SystemSettings,
      },
    ],
  },
  {
    path: '/vendor',
    Component: VendorLayout,
    children: [
      {
        index: true,
        Component: VendorDashboardPage,
      },
      {
        path: 'dashboard',
        Component: VendorDashboardPage,
      },
      {
        path: 'requirements',
        Component: RequirementsFeed,
      },
      {
        path: 'requirements/:id',
        Component: RequirementDetail,
      },
      {
        path: 'requirements/:id/place-bid',
        Component: PlaceBid,
      },
      {
        path: 'bids',
        Component: MyBids,
      },
      {
        path: 'bids/:id/edit',
        Component: PlaceBid,
      },
      {
        path: 'bids/:id/detail',
        Component: VendorBidDetail,
      },
      {
        path: 'events',
        Component: AwardedEvents,
      },
      {
        path: 'events/:id',
        Component: EventDetail,
      },
      {
        path: 'messages',
        Component: VendorMessages,
      },
      {
        path: 'deliverables',
        Component: Deliverables,
      },
      {
        path: 'earnings',
        Component: VendorEarnings,
      },
      {
        path: 'invoices',
        Component: VendorInvoices,
      },
      {
        path: 'invoices/:id',
        Component: InvoiceDetail,
      },
      {
        path: 'attendance',
        Component: VendorAttendance,
      },
      {
        path: 'ads',
        Component: VendorAds,
      },
      {
        path: 'ads/:id',
        Component: AdDetail,
      },
      {
        path: 'support',
        Component: VendorSupport,
      },
      {
        path: 'support/:id',
        Component: TicketDetail,
      },
      {
        path: 'profile',
        Component: VendorProfilePage,
      },
      {
        path: 'portfolio',
        Component: Portfolio,
      },
      {
        path: 'packages',
        Component: Packages,
      },
      {
        path: 'availability',
        Component: VendorAvailability,
      },
      {
        path: 'settings',
        Component: VendorSettings,
      },
    ],
  },
  {
    path: '/planner',
    Component: PlannerLayout,
    children: [
      {
        index: true,
        Component: PlannerDashboard,
      },
      {
        path: 'dashboard',
        Component: PlannerDashboard,
      },
      {
        path: 'events',
        Component: PlannerEvents,
      },
      {
        path: 'vendors',
        Component: PlannerVendors,
      },
      {
        path: 'bids',
        Component: PlannerBids,
      },
      {
        path: 'payments',
        Component: PlannerPayments,
      },
      {
        path: 'invitations',
        Component: PlannerInvitations,
      },
      {
        path: 'attendance',
        Component: PlannerAttendance,
      },
      {
        path: 'support',
        Component: PlannerSupport,
      },
      {
        path: 'settings',
        Component: PlannerSettings,
      },
    ],
  },
  {
    path: '*',
    Component: RouteErrorElement,
  },
]);