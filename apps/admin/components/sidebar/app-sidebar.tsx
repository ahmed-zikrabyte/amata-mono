"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@workspace/ui/components/sidebar"
import { NavMain } from "./nav-main"
import React from "react"
import { BoxIcon, Bus, ContactIcon, Group, Home, MessageCircle, MessageCircleQuestion, Newspaper, Settings2, Ticket, User } from "lucide-react";

export function AppSidebar() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        type: "dashboard",
      },
      // {
      //   title: "Banners",
      //   url: "/banner",
      //   icon: Home,
      //   type: "banners",
      //   count: banners,
      // },
      // {
      //   title: "Categories",
      //   url: "/categories?type=categories&page=1",
      //   icon: Group,
      //   type: "categories",
      //   count: categories,
      // },
      // {
      //   title: "Products",
      //   url: "/products?type=products&page=1",
      //   icon: BoxIcon,
      //   type: "products",
      //   count: products,
      // },
      // {
      //   title: "Coupons",
      //   url: "/coupons?type=coupons&section=admin&page=1",
      //   icon: Ticket,
      //   type: "coupons",
      //   count: coupons,
      // },
      // {
      //   title: "Orders",
      //   url: "/orders?type=orders&page=1",
      //   icon: Bus,
      //   type: "orders",
      //   count: orders,
      // },
      // {
      //   title: "Reviews",
      //   url: "/reviews?type=reviews",
      //   icon: MessageCircle,
      //   type: "reviews",
      //   count: reviews,
      // },
      // {
      //   title: "Users",
      //   url: "/users?type=users",
      //   icon: User,
      //   type: "users",
      //   count: users,
      // },
      // {
      //   title: "Boxes",
      //   url: "/boxes?type=boxes",
      //   icon: BoxIcon,
      //   type: "boxes",
      //   count: boxes,
      // },
      {
        title: "Blogs",
        url: "/blogs",
        icon: Newspaper,
        type: "faqs",
        // count: faqs,
      },
      {
        title: "Contacts",
        url: "/contacts",
        icon: ContactIcon,
        type: "contacts",
        // count: contacts,
      },
      {
        title: "FAQs",
        url: "/faqs",
        icon: MessageCircleQuestion,
        type: "faqs",
        // count: faqs,
      },
      // {
      //   title: "Config",
      //   url: "/config?type=config",
      //   icon: Settings2,
      //   type: "config",
      // },
    ],
  };
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="">
        <React.Suspense fallback={<div>Loading...</div>}>
          {" "}
          <NavMain items={data.navMain} />
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}