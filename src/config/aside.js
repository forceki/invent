import { ArrowUpOnSquareIcon, ArchiveBoxIcon, ChartPieIcon } from '@heroicons/vue/24/outline'
import { PenerbitanColor, ArchiveColor, DashboardColor, PengendalianColor, SubrogasiColor, Entry, EntrySide } from '../assets/customSvg';
import Cookies from 'js-cookie'
const DocMenuConfig = [
        // {
        //   sectionTitle: "Dashboard",
        //   route: "/dashboard",
        //   svgIcon: ChartPieIcon,
        //   activeIcon: DashboardColor,
        //   padding: false
        // },
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
        {
          sectionTitle: "Item",
          route: "/item",
          activeIcon: ArchiveColor,
          svgIcon: ArchiveBoxIcon,
          sub: [
            {
              heading: "List Item",
              padding: true,
              route: "/item",
            },
            {
              heading: "Add Item",
              padding: true,
              route: "/item/add",
            }
          ],
        },
        {
          sectionTitle: "Master",
          route: "/",
          activeIcon: ArchiveColor,
          svgIcon: ArchiveBoxIcon,
          sub: [
            {
              heading: "List Gudang",
              padding: true,
              route: "/gudang",
            },
            {
              heading: "List Supplier",
              padding: true,
              route: "/supplier",
            },
            {
              heading: "List Kategori",
              padding: true,
              route: "/kategori",
            }
          ],
        },
  ];

  export default DocMenuConfig;
  