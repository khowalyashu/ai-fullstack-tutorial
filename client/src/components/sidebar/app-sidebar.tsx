import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Command,
  MessageCircleQuestion,
  Settings2,
  Sparkles,
} from "lucide-react"

import { NavFavorites } from "@/components/sidebar/nav-favorites"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Start a new chat",
      url: "#",
      icon: Sparkles,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Prompts",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    }
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      url: "#",
    },
    {
      name: "Professional Development",
      emoji: "💼",
      url: "#",
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      url: "#",
    },
    {
      name: "Home Management",
      emoji: "🏡",
      url: "#",
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      url: "#",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavFavorites favorites={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
