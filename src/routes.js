import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard"));

/**
 * Profile Components
 * @type {React.LazyExoticComponent<React.ComponentType<any>>}
 */
const AdminProfile = React.lazy(() =>
  import("./views/accountSettings/profile")
);
const AdminProfileEdit = React.lazy(() =>
  import("./views/accountSettings/profileEdit")
);
const ChangePassword = React.lazy(() =>
  import("./views/accountSettings/changePassword")
);

/**
 * User Management Components
 *
 */
const AdminTable = React.lazy(() => import("./views/user/admin/adminTable"));
const AdminView = React.lazy(() => import("./views/user/admin/adminView"));

/**
 * Product Management Component
 */
const CreateProduct = React.lazy(() => import("./views/product/addProduct"));
const ProductTable = React.lazy(() => import("./views/product/productTable"));
const ProductView = React.lazy(() => import("./views/product/productView"));

/**
 * Category Management Component
 */
const CreateCategory = React.lazy(() => import("./views/category/addCategory"));
const CategoryTable = React.lazy(() =>
  import("./views/category/categoryTable")
);
const CategoryView = React.lazy(() => import("./views/category/categoryView"));

/**
 * Coupon Management Component
 */
const CreateCoupon = React.lazy(() => import("./views/coupon/addCoupon"));
const CouponTable = React.lazy(() => import("./views/coupon/couponTable"));
const CouponView = React.lazy(() => import("./views/coupon/couponView"));

/**
 * Order Management Component
 */
const OrderTable = React.lazy(() => import("./views/order/orderTable"));
const OrderView = React.lazy(() => import("./views/order/orderView"));

const Dashboard = React.lazy(() => import("./views/dashboard/index"));
//////////////
/**
 * Staff Management Component
 */
const CreateStaff = React.lazy(() => import("./views/staff/addStaff"));
// const StaffTable = React.lazy(() =>
//  import("./views/product/staffTable"));
// const StaffView = React.lazy(() =>
//  import("./views/product/staffView"));

//////////////
/**
 * Customer Management Component
 */
const CheckAvailability = React.lazy(() =>
  import("./views/customer/checkAvailability")
);
const Bookingform = React.lazy(() => import("./views/customer/bookingForm"));

const routes = [
  //Manager routes
  { path: "/manager/", exact: true, name: "Home" },
  {
    path: "/manager/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/manager/staff/add-staff",
    name: "Staff",
    component: CreateStaff,
  },
  {
    path: "/manager/staff/view-staff",
    name: "Staff",
    component: ProductTable,
  },
  // Customer routes
  { path: "/customer/", exact: true, name: "Home" },
  {
    path: "/customer/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/customer/check-availability",
    name: "Check Availability",
    component: CheckAvailability,
  },
  {
    path: "/customer/booking-form",
    name: "Booking form",
    component: Bookingform,
  },
];

export default routes;
