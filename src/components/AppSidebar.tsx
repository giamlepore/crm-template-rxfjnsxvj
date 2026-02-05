import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  CalendarDays,
  CheckSquare,
  FileText,
  BarChart3,
  Settings,
  Moon,
  Sun,
} from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const location = useLocation()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Leads', path: '/leads' },
    { icon: KanbanSquare, label: 'Pipeline', path: '/pipeline' },
    { icon: CalendarDays, label: 'Atividades', path: '/activities' },
    { icon: CheckSquare, label: 'Tarefas', path: '/tasks' },
    { icon: FileText, label: 'Propostas', path: '/proposals' },
    { icon: BarChart3, label: 'Relatórios', path: '/reports' },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-sidebar-border/50">
        <div className="flex items-center gap-2 font-bold text-xl px-2 w-full overflow-hidden">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-primary-foreground text-xs">S</span>
          </div>
          <span className="group-data-[collapsible=icon]:hidden transition-all duration-200">
            SugarCRM
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                    className="h-10 my-1"
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {location.pathname === item.path && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <div className="flex flex-col gap-2 group-data-[collapsible=icon]:items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0" />
            ) : (
              <Moon className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0" />
            )}
            <span className="group-data-[collapsible=icon]:hidden">
              {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <Settings className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Configurações
            </span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
