import { ArrowUpOnSquareIcon, ArchiveBoxIcon, ChartPieIcon } from '@heroicons/vue/24/outline'
import { PenerbitanColor, ArchiveColor, DashboardColor, PengendalianColor, SubrogasiColor, Entry, EntrySide } from '../assets/customSvg';
import Cookies from 'js-cookie'
const DocMenuConfig = [
        {
          sectionTitle: "Dashboard",
          route: "/dashboard",
          svgIcon: ChartPieIcon,
          activeIcon: DashboardColor,
          padding: false
        },
        {
          sectionTitle: "Barang",
          route: "/barang",
          activeIcon: ArchiveColor,
          svgIcon: ArchiveBoxIcon,
          sub: [
            {
              heading: "List Barang",
              padding: true,
              route: "/barang",
            },
            {
              heading: "Inventory In",
              padding: true,
              route: "/barang/inventory-in",
            },
            {
              heading: "Inventory Out",
              padding: true,
              route: "/barang/inventory-out",
            },
            {
              heading: "Retur Barang",
              padding: true,
              route: "/barang/retur",
            },
          ],
        },
        {
          sectionTitle: "Checkins",
          route: "/checkins",
          activeIcon: ArchiveColor,
          svgIcon: ArchiveBoxIcon,
          sub: [
            {
              heading: "List Checkins",
              padding: true,
              route: "/checkins",
            },
            {
              heading: "Add Checkins",
              padding: true,
              route: "/checkins/add",
            }
          ],
        },
        
  ];

  export default DocMenuConfig;
  